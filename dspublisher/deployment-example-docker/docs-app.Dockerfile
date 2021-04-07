FROM nginx:1.19.9-alpine

COPY out/public /usr/share/nginx/html
