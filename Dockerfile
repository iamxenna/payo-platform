FROM node:14-alpine

RUN mkdir -p /usr/src/app

ENV PORT 7070

WORKDIR /usr/src/app

COPY package.json yarn.lock* /usr/src/app/

RUN yarn install

COPY . /usr/src/app

RUN yarn build

EXPOSE 7000

ENTRYPOINT ["yarn", "start", "-p", "7070"]
