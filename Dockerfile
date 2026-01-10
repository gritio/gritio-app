FROM node:22-alpine AS builder

ARG NODE_ENV=production

WORKDIR /app

COPY package*.json ./

RUN npm ci --include=dev

COPY . .

RUN NODE_ENV=${NODE_ENV} npm run build -- --mode ${NODE_ENV}

FROM node:22-alpine

WORKDIR /app

RUN npm install -g serve

COPY --from=builder /app/dist ./dist

EXPOSE 3000


CMD ["serve", "-s", "dist", "-l", "3000"]
