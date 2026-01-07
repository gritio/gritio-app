#!/bin/sh

echo "DATABASE_URL is: $DATABASE_URL"

if [ -z "$DATABASE_URL" ]; then
  echo "ERROR: DATABASE_URL is not set"
  exit 1
fi

echo "Running Prisma migrations..."
npx prisma migrate deploy || echo "Migration failed, continuing..."

echo "Starting NestJS application..."
exec node dist/main
