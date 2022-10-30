FROM node:16

COPY . /usr/src/app/extras/tasks/producers
WORKDIR /usr/src/app/extras/tasks/producers

RUN yarn install --check-files

EXPOSE 8080

CMD ["yarn", "start"]