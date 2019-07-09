# --- Build step
FROM node:alpine AS builder

WORKDIR /app

COPY ./package*.json ./

RUN npm install --quiet --unsafe-perm

COPY ./tsconfig.json ./
COPY ./src ./src/

RUN npm run build

FROM node:alpine

# Execution step
WORKDIR /app

COPY --from=builder /app/dist ./dist/

EXPOSE 4000

CMD ["node", "dist/src/index.js"]
