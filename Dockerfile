FROM node:alpine

WORKDIR /usr/app

RUN npm install --global pm2

COPY package*.json ./

RUN npm install --production

COPY . .

EXPOSE 4000

USER node

CMD [ "pm2-runtime", "npm", "--", "start" ]