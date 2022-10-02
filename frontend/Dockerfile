FROM node:14

COPY . /usr/src/app
WORKDIR /usr/src/app

RUN yarn install --check-files

EXPOSE 3002

CMD ["yarn", "start"]