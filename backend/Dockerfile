FROM node:latest

WORKDIR /usr/social_nest

COPY package.json .

RUN yarn

COPY . .

EXPOSE 3100

CMD ["yarn", "start:dev"]
