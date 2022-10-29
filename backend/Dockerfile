FROM node:16

COPY . /usr/src/app/backend
WORKDIR /usr/src/app/backend

RUN yarn install --check-files
RUN yarn sequelize-cli db:migrate

EXPOSE 3000

CMD ["yarn", "start"]