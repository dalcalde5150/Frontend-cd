FROM node:16

COPY . /usr/src/app
WORKDIR /usr/src/app

RUN yarn install --check-files

EXPOSE 3000

CMD ["sh", "-c", "node src/config/createdb.js && yarn sequelize-cli db:migrate && yarn start"]