FROM node:22-alpine

WORKDIR /app

COPY src/api/package*.json ./

RUN npm ci

COPY src/api .

RUN npm run build

EXPOSE 3000

CMD ["sh", "-c", "npx prisma migrate deploy && node dist/src/main"]
