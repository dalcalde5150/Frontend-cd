FROM node:16

COPY . /usr/src/app/extras/tasks/workers
WORKDIR /usr/src/app/extras/tasks/workers

RUN yarn install --check-files

CMD ["yarn", "start"]