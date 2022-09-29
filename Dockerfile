FROM python:3.8.13-alpine3.16

RUN apk update
RUN apk add postgresql-dev gcc python3-dev musl-dev
RUN pip install --upgrade pip
RUN pip install ez_setup 
RUN pip install paho-mqtt
RUN pip install psycopg2

RUN mkdir -p /usr/src/app
COPY mqttsub.py /usr/src/app
WORKDIR /usr/src/app

CMD ["python3", "/usr/src/app/mqttsub.py"]