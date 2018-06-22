FROM node:8-alpine
#This assumes npm run build:prod has already run.

RUN mkdir app
WORKDIR app
COPY package.json .
COPY public public
COPY server server
COPY shared shared

ENV NODE_ENV=production

RUN npm install --production

EXPOSE 3030
ENTRYPOINT ["node", "server/index.js"]