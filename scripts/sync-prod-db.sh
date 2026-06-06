#!/bin/bash

# Sync production database from Railway to local development
# Uses SSH tunnel through gritio-backend service to access postgres.railway.internal

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${YELLOW}📥 Syncing production database from Railway...${NC}"

# Check if docker-compose postgres is running
if ! docker-compose ps 2>/dev/null | grep -q "gritio-postgres.*Up"; then
    echo -e "${RED}❌ PostgreSQL container not running. Start with: docker-compose up -d postgres${NC}"
    exit 1
fi

echo -e "${GREEN}✓ Using Docker PostgreSQL container${NC}"

# Check if railway CLI is installed
if ! command -v railway &> /dev/null; then
    echo -e "${RED}❌ Railway CLI not found. Install it with: npm i -g @railway/cli${NC}"
    exit 1
fi

# Check if linked to a Railway project
if ! railway status &> /dev/null; then
    echo -e "${RED}❌ Not linked to Railway project. Run: railway link${NC}"
    exit 1
fi

# Find pg_dump and psql in common locations
PGDUMP=$(which pg_dump 2>/dev/null || \
         find /Library/PostgreSQL -name pg_dump 2>/dev/null | head -1 || \
         find /usr/local -name pg_dump 2>/dev/null | head -1 || \
         find /opt/homebrew -name pg_dump 2>/dev/null | head -1)

PSQL=$(which psql 2>/dev/null || \
       find /Library/PostgreSQL -name psql 2>/dev/null | head -1 || \
       find /usr/local -name psql 2>/dev/null | head -1 || \
       find /opt/homebrew -name psql 2>/dev/null | head -1)

if [ -z "$PGDUMP" ] || [ -z "$PSQL" ]; then
    echo -e "${RED}❌ PostgreSQL tools not found (pg_dump or psql).${NC}"
    echo "  Mac: brew install postgresql"
    echo "  Linux: sudo apt install postgresql-client"
    exit 1
fi

# Get DATABASE_URL to extract password
PROD_DB_URL=$(railway variable list --kv 2>/dev/null | grep DATABASE_URL | cut -d'=' -f2-)

if [ -z "$PROD_DB_URL" ]; then
    echo -e "${RED}❌ Could not fetch DATABASE_URL from Railway${NC}"
    exit 1
fi

# Extract password from DATABASE_URL
# Format: postgresql://user:password@host:port/database
PGPASS=$(echo "$PROD_DB_URL" | sed -n 's/.*:\([^@]*\)@.*/\1/p')

if [ -z "$PGPASS" ]; then
    echo -e "${RED}❌ Could not extract password from DATABASE_URL${NC}"
    exit 1
fi

# Setup Railway SSH config if needed
echo -e "${YELLOW}🔐 Setting up SSH tunnel to Railway...${NC}"
railway ssh config -s gritio-backend > /dev/null 2>&1 || true

# Resolve postgres.railway.internal to IP through backend container
POSTGRES_IP=$(railway ssh -s gritio-backend nc -zv postgres.railway.internal 5432 2>&1 | grep -Eo '[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}' | head -1)

if [ -z "$POSTGRES_IP" ]; then
    echo -e "${RED}❌ Could not resolve postgres.railway.internal from Railway backend${NC}"
    exit 1
fi

echo -e "${GREEN}✓ Postgres resolved to $POSTGRES_IP${NC}"

# Create SSH tunnel via backend to postgres
# Use port 5434 (not 5433) to avoid killing the local Docker postgres port-forward
LOCAL_TUNNEL_PORT=5434
echo -e "${YELLOW}🔗 Creating SSH tunnel (localhost:$LOCAL_TUNNEL_PORT → postgres)...${NC}"

# Kill any existing tunnel on this port (safe - 5434 is dedicated for sync tunnel)
lsof -ti:$LOCAL_TUNNEL_PORT 2>/dev/null | xargs kill -9 2>/dev/null || true
sleep 1

# Start SSH tunnel in background
ssh -i ~/.ssh/id_rsa -L $LOCAL_TUNNEL_PORT:$POSTGRES_IP:5432 railway-gritio-backend -N > /dev/null 2>&1 &
TUNNEL_PID=$!
sleep 2

# Verify tunnel is working
if ! kill -0 $TUNNEL_PID 2>/dev/null; then
    echo -e "${RED}❌ Failed to establish SSH tunnel${NC}"
    exit 1
fi

echo -e "${GREEN}✓ SSH tunnel established (PID: $TUNNEL_PID)${NC}"

# Create backup directory if it doesn't exist
mkdir -p ./backups

# Create dump file
DUMP_FILE="./backups/gritio_prod_backup_$(date +%s).sql"
echo -e "${YELLOW}💾 Creating dump from production (this may take a moment)...${NC}"

# Create dump using SSH tunnel
if PGPASSWORD="$PGPASS" "$PGDUMP" -h localhost -p $LOCAL_TUNNEL_PORT -U postgres -d railway > "$DUMP_FILE" 2>&1; then
    DUMP_SIZE=$(du -h "$DUMP_FILE" | cut -f1)
    echo -e "${GREEN}✓ Dump created ($DUMP_SIZE)${NC}"
    # Debug: show dump file size in bytes
    if [ -s "$DUMP_FILE" ]; then
        BYTES=$(wc -c < "$DUMP_FILE")
        echo -e "${GREEN}  Dump file size: $BYTES bytes${NC}"
    else
        echo -e "${YELLOW}  WARNING: Dump file is empty!${NC}"
    fi
else
    echo -e "${RED}❌ Failed to create dump${NC}"
    kill $TUNNEL_PID 2>/dev/null || true
    rm -f "$DUMP_FILE"
    exit 1
fi

# Local database connection (Docker)
LOCAL_DB_URL="postgresql://postgres:postgres@postgres:5432/gritio_db"

echo -e "${YELLOW}📝 Restoring to Docker database...${NC}"

# Create local database if it doesn't exist (using docker-compose)
docker-compose exec -T postgres psql -U postgres -d postgres -c "CREATE DATABASE gritio_db;" 2>/dev/null || true

# Drop existing schema and restore (using docker-compose)
echo -e "${YELLOW}Dropping and recreating public schema...${NC}"
docker-compose exec -T postgres psql -U postgres -d gritio_db -c "DROP SCHEMA public CASCADE; CREATE SCHEMA public;" 2>&1 | grep -v "does not exist" || true

# Restore the dump (via docker-compose)
echo -e "${YELLOW}Restoring dump file...${NC}"
if docker-compose exec -T postgres psql -U postgres -d gritio_db < "$DUMP_FILE" 2>&1 | tail -20; then
    echo -e "${GREEN}✓ Database restored successfully${NC}"
    # Debug: check if data was actually restored
    TABLE_COUNT=$(docker-compose exec -T postgres psql -U postgres -d gritio_db -c "SELECT COUNT(*) FROM information_schema.tables WHERE table_schema = 'public';" 2>&1 | grep -o '[0-9]*' | head -1)
    echo -e "${GREEN}  Tables in public schema: $TABLE_COUNT${NC}"
else
    echo -e "${RED}❌ Failed to restore database${NC}"
    echo "Make sure PostgreSQL is running: docker-compose up -d postgres"
    kill $TUNNEL_PID 2>/dev/null || true
    exit 1
fi

# Cleanup (keep dump file for debugging)
echo -e "${GREEN}✓ Dump file saved to: $DUMP_FILE${NC}"
kill $TUNNEL_PID 2>/dev/null || true
echo -e "${GREEN}✓ SSH tunnel closed${NC}"

echo -e "${GREEN}✅ Production database synced! Your local DB is now in sync with production.${NC}"
echo ""
echo "Next steps:"
echo "  1. Restart your local server if running"
echo "  2. Test your changes against production data"
echo ""
echo -e "${YELLOW}⚠️  WARNING: This data may contain sensitive user information${NC}"
echo "   Make sure you're not committing this to version control!"
