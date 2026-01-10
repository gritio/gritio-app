FROM node:22-alpine

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["sh", "-c", "if [ -n \"$RAILWAY_ENVIRONMENT\" ]; then npx prisma migrate deploy && npm run seed && node dist/src/main.js; else node dist/src/main.js; fi"]
