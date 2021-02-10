FROM node:14-alpine

RUN npm i -g light-server@2.9.1

COPY out/public /pub

CMD light-server -s /pub -p 80 -x http://docs:8080 --proxypath "/vaadin" --proxypath "/connect"
