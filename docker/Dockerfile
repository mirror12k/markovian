#!/usr/bin/env -S bash -c "docker run -v \${PWD}:/app -p3000:3000 -it \$(docker build -q docker) \$@"
FROM ubuntu:20.04

WORKDIR /app

ARG DEBIAN_FRONTEND=noninteractive
RUN apt-get update \
    && apt-get install -y curl nano jq zip

RUN curl -sL https://deb.nodesource.com/setup_14.x | bash -

ARG DEBIAN_FRONTEND=noninteractive
RUN apt-get update \
    && apt-get install -y openssh-client \
    && apt-get install -y nodejs \
    && apt autoclean \
    && apt autoremove \
    && apt clean


RUN useradd -ms /bin/bash runuser
RUN chown -R runuser:runuser /app
USER runuser

CMD bash


