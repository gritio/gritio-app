FROM node:22-alpine

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

RUN echo "NODE_ENV is: $NODE_ENV"

RUN sh -c "if [ \"$NODE_ENV\" = \"production\" ] || [ \"$NODE_ENV\" = \"PRODUCTION\" ]; then echo 'Running prisma generate'; npx prisma generate; else echo 'Skipping prisma generate (not production)'; fi"

RUN npm run build

EXPOSE 3000

CMD ["sh", "-c", "if [ \"$NODE_ENV\" = \"production\" ] || [ \"$NODE_ENV\" = \"PRODUCTION\" ]; then npx prisma migrate deploy && npm run seed && node dist/src/main.js; else node dist/src/main.js; fi"]
