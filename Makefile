.PHONY: help setup up down logs sync-db

help:
	@echo "Gritio Development Commands"
	@echo ""
	@echo "  make setup          - First time setup (install dependencies, link Railway)"
	@echo "  make up             - Start all services"
	@echo "  make down           - Stop all services"
	@echo "  make logs           - View service logs"
	@echo "  make sync-db        - Sync production database from Railway"
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

clean:
	docker-compose down -v
	@echo "✅ Containers and volumes removed"

shell-backend:
	docker-compose exec backend sh

shell-db:
	docker-compose exec postgres psql -U postgres -d gritio

fresh-start: down clean up
	@echo "✅ Fresh start complete"

dev: up
	@echo "🚀 Development environment running"
	@echo "Frontend: http://localhost:5173"
	@echo "Backend:  http://localhost:3000"
