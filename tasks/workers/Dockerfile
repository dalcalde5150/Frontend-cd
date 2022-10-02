FROM node:16

COPY . /usr/src/app
WORKDIR /usr/src/app

RUN yarn install --check-files

CMD ["yarn", "start"]