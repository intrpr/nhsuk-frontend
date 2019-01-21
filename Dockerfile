FROM node:8.12.0

ARG BACKSTOPJS_VERSION

ENV \
BACKSTOPJS_VERSION=$BACKSTOPJS_VERSION \
# Workaround to fix phantomjs-prebuilt installation errors
# See https://github.com/Medium/phantomjs/issues/707
NPM_CONFIG_UNSAFE_PERM=true

# Base packages
RUN apt-get update && \
apt-get install -y git sudo software-properties-common python-software-properties

RUN sudo npm install -g --unsafe-perm=true --allow-root backstopjs@${BACKSTOPJS_VERSION}

RUN wget https://dl-ssl.google.com/linux/linux_signing_key.pub && sudo apt-key add linux_signing_key.pub
RUN sudo add-apt-repository "deb http://dl.google.com/linux/chrome/deb/ stable main"

RUN	apt-get -y update && \
apt-get -y install google-chrome-stable

RUN apt-get install -y firefox-esr

ports:
  - "3000:3000"

WORKDIR /src

ENTRYPOINT ["backstop"]
