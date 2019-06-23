FROM node:10-alpine as builder

COPY package.json package-lock.json ./

RUN npm ci && mkdir /app && mv ./node_modules ./app

WORKDIR /app

COPY . /app

RUN npm run ng build -- --prod --output-path=dist

FROM nginx:1.14.1-alpine

COPY nginx/default.conf /etc/nginx/conf.d/

RUN rm -rf /usr/share/nginx/html/*

COPY --from=builder /app/dist /usr/share/nginx/html

CMD ["nginx", "-g", "daemon off;"]