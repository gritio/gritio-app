# Development Scripts

## sync-prod-db.sh

Download your production database from Railway and restore it locally for testing.

### Prerequisites

```bash
# Install Railway CLI
npm i -g @railway/cli

# Login to Railway
railway login

# Link this project to your Railway project
railway link

# Register SSH keys with Railway (one-time setup)
railway ssh keys add
```

### Usage

```bash
make sync-db
# or
./scripts/sync-prod-db.sh
```

This will:
1. Fetch the `DATABASE_URL` from your Railway production environment
2. Setup SSH tunnel through gritio-backend to postgres.railway.internal
3. Create a pg_dump from the production database via the tunnel
4. Restore it to your local PostgreSQL (docker-compose)
5. Clean up temporary files and close SSH tunnel

### Requirements

- **PostgreSQL CLI tools** (pg_dump + psql)
  - Mac: `brew install postgresql`
  - Linux: `sudo apt install postgresql-client`

- **PostgreSQL running locally** (via `docker-compose up`)

- **SSH key registered with Railway**
  ```bash
  railway ssh keys add
  ```

- **SSH config auto-generated** (script does this automatically)
  - Located at `~/.ssh/config`
  - Entry: `railway-gritio-backend`

### How It Works

The script uses an **SSH tunnel** to securely access the production database:

1. **SSH Connection**: Creates a tunnel through the `gritio-backend` service (which has access to `postgres.railway.internal`)
2. **Port Forward**: Maps localhost:5433 → postgres:5432 through the tunnel
3. **pg_dump**: Runs pg_dump through the tunnel against the forwarded port
4. **Restore**: Restores the dump to local PostgreSQL

This approach is more reliable than direct connection since:
- `postgres.railway.internal` is only accessible from within Railway's network
- The backend container has proper network access
- SSH keys provide secure authentication

### ⚠️ Security Note

The downloaded database may contain:
- Real user data
- Passwords / authentication tokens
- Sensitive information

**Never commit production data to version control!**

Use `.gitignore` entries to prevent accidental commits:
```
*.sql
.env.production.local
prod_backup/
/tmp/*prod_backup*
```

### Troubleshooting

**"Railway CLI not found"**
```bash
npm i -g @railway/cli
```

**"Not linked to Railway project"**
```bash
railway link
```

**"PostgreSQL tools not found"**
```bash
# Mac
brew install postgresql

# Linux
sudo apt install postgresql-client
```

**"SSH tunnel failed"**
Make sure SSH keys are registered:
```bash
railway ssh keys add
railway ssh -s gritio-backend whoami  # Test SSH access
```

**"Connection refused on local port"**
- Ensure Docker postgres is running: `docker-compose up -d postgres`
- Check port 5433 is available (tunnel uses this)
- Existing tunnel process: `lsof -i :5433`

**"Failed to restore database"**
- Verify local postgres is running and accepting connections
- Check available disk space
- Ensure `gritio` database can be created (requires postgres user permissions)
