FROM node:16

COPY . /usr/src/app/frontend
WORKDIR /usr/src/app/frontend

RUN yarn install --check-files

EXPOSE 3002

CMD ["yarn", "start"]