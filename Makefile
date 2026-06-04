.PHONY: help setup up down logs sync-db dev-local restore-latest

help:
	@echo "Gritio Development Commands"
	@echo ""
	@echo "  make setup          - First time setup (install dependencies, link Railway)"
	@echo "  make up             - Start all services with Docker"
	@echo "  make down           - Stop all services"
	@echo "  make dev-local      - Start backend + frontend locally (requires DB running)"
	@echo "  make logs           - View service logs"
	@echo "  make sync-db        - Sync production database from Railway (saves to ./backups/)"
	@echo "  make restore-latest - Restore from latest backup file"
	@echo "  make clean          - Remove containers and volumes"
	@echo "  make shell-backend  - SSH into backend container"
	@echo "  make shell-db       - Connect to PostgreSQL"
	@echo ""

setup:
	@echo "📦 Installing dependencies..."
	@npm i -g @railway/cli
	@echo ""
	@echo "🔗 Linking to Railway project..."
	@railway login
	@railway link
	@echo ""
	@echo "✅ Setup complete! Run 'make up' to start"

up:
	docker-compose up --build -d
	@echo "✅ Services started"
	@echo "   Frontend: http://localhost:5173"
	@echo "   Backend:  http://localhost:3000"
	@echo "   pgAdmin:  http://localhost:5050"

down:
	docker-compose down
	@echo "✅ Services stopped"

logs:
	docker-compose logs -f

sync-db:
	@echo "🔄 Syncing production database..."
	@./scripts/sync-prod-db.sh

restore-latest:
	@echo "📥 Restoring from latest backup..."
	@LATEST_DUMP=$$(ls -t ./backups/gritio_prod_backup_*.sql 2>/dev/null | head -1); \
	if [ -z "$$LATEST_DUMP" ]; then \
		echo "❌ No backup files found in ./backups/"; \
		exit 1; \
	fi; \
	if ! docker-compose ps 2>/dev/null | grep -q "gritio-postgres.*Up"; then \
		echo "❌ PostgreSQL container not running. Start with: make up"; \
		exit 1; \
	fi; \
	echo "Using: $$LATEST_DUMP"; \
	docker-compose exec -T postgres psql -U postgres -d postgres -c "CREATE DATABASE gritio_db;" 2>/dev/null || true; \
	docker-compose exec -T postgres psql -U postgres -d gritio_db -c "DROP SCHEMA public CASCADE; CREATE SCHEMA public;" 2>&1 | grep -v "does not exist" || true; \
	docker-compose exec -T postgres psql -U postgres -d gritio_db < "$$LATEST_DUMP" && \
	echo "✅ Database restored from $$LATEST_DUMP"

clean:
	docker-compose down -v
	@echo "✅ Containers and volumes removed"

shell-backend:
	docker-compose exec backend sh

shell-db:
	docker-compose exec postgres psql -U postgres -d gritio

fresh-start: down clean up
	@echo "✅ Fresh start complete"

dev-local:
	@echo "🚀 Installing dependencies..."
	@npm install > /dev/null 2>&1
	@cd src/api && npm install > /dev/null 2>&1 && npx prisma generate > /dev/null 2>&1 && cd ../..
	@echo "✅ Starting backend + frontend locally..."
	@echo "Frontend: http://localhost:5173"
	@echo "Backend:  http://localhost:3000"
	@echo ""
	@echo "Make sure PostgreSQL is running (docker-compose up postgres)"
	@echo "Press Ctrl+C to stop both"
	@echo ""
	@(cd src/api && npm run start:dev) & npm run dev:frontend
