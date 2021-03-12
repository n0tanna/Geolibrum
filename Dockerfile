FROM ubuntu:latest

RUN mkdir /app

COPY . /app/

WORKDIR /app

RUN apt-get update && apt-get install -y curl
RUN adduser --disabled-password --gecos "" geo
RUN chown -R geo /app/
RUN curl https://install.meteor.com/ | sh
RUN chmod +x /app/bin/docker-entrypoint.sh

USER geo

EXPOSE 3000

ENTRYPOINT ["/app/bin/docker-entrypoint.sh"]
