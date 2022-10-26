FROM node:16

COPY . /usr/src/app
WORKDIR /usr/src/app

RUN yarn install --check-files

EXPOSE 8080

CMD ["yarn", "start"]