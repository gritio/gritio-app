Start the Gritio application using Docker Compose.

Run the following command from the project root:

```bash
docker-compose up --build
```

This starts all services:
- **Frontend**: http://localhost:5173
- **Backend**: http://localhost:3000
- **PostgreSQL**: database with persistent data
- **pgAdmin**: http://localhost:5050 (admin@example.com / admin)

To stop: `docker-compose down`
