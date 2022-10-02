FROM ruby:2.7.6-buster

# Codigo extraído de https://scotto.medium.com/2021-docker-ruby-3-rails-6-puma-nginx-postgres-d84c95f68637
# Install node 14-LTS and yarn
RUN curl -sL https://deb.nodesource.com/setup_14.x | bash -
RUN apt-get update -qq && apt-get install -qq --no-install-recommends \
    nodejs \
  && apt-get clean \
  && rm -rf /var/lib/apt/lists/*
RUN npm install -g yarn@1
##########################################################################################################

ENV DB_HOST=db
ENV DB_USER=admin
ENV DB_PASSWORD=admin

COPY . /usr/src/app/
WORKDIR /usr/src/app/

RUN gem install bundler:1.17.3
RUN gem uninstall sassc
RUN gem install sassc -- --disable-march-tune-native
RUN bundle install
RUN yarn install --check-files
RUN rails webpacker:install

EXPOSE 3000

CMD ["sh", "-c", "rake db:create && rake db:migrate && rails s -b 0.0.0.0"]