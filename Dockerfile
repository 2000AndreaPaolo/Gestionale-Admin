FROM nginx:alpine
COPY nginx/default.conf /etc/nginx/nginx.conf
WORKDIR /usr/share/nginx/html
COPY dist/Gestionale-admin .