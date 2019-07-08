FROM node:10

WORKDIR /usr/src/app

COPY ./package*.json ./
COPY ./tsconfig.json ./
COPY ./src ./src/

RUN npm install --quiet --unsafe-perm

EXPOSE 4000

RUN ls -a

CMD ["node", "dist/src/index.js"]
