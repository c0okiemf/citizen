FROM node:16

ARG APP_ENV
ENV APP_ENV=${APP_ENV}
RUN npm install pm2@latest -g
WORKDIR /usr/src/app
COPY package.json ./
COPY yarn.lock ./
RUN yarn install
COPY . .

RUN yarn build

EXPOSE 3000

CMD pm2 start pm2.json && pm2 --no-daemon
