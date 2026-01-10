FROM node:22-alpine

ARG BUILD_ENV

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

RUN echo "BUILD_ENV is: $BUILD_ENV"

RUN if [ "$BUILD_ENV" != "development" ]; then echo "Running prisma generate..."; npx prisma generate; else echo "Skipping prisma generate (development mode)"; fi

RUN npm run build

EXPOSE 3000

CMD ["sh", "-c", "npx prisma migrate deploy && npm run seed && node dist/src/main.js"]
