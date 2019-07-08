# --- Build step
FROM node:10.16 AS builder

WORKDIR /app

COPY ./package*.json ./

RUN npm install --quiet --unsafe-perm

COPY ./tsconfig.json ./
COPY ./src ./src/

RUN npm run build

FROM node:10.16

# Execution step
WORKDIR /app

COPY --from=builder /app/dist ./dist/

EXPOSE 4000

CMD ["node", "dist/src/index.js"]
