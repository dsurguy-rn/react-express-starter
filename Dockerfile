FROM node:10-alpine
#This assumes npm run build:prod has already run.

RUN mkdir app
WORKDIR app
COPY package.json .
COPY server server
COPY client-dist client

ENV NODE_ENV=production

RUN npm install --production

EXPOSE 3030
ENTRYPOINT ["node", "server/index.js"]