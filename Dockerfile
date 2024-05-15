# build environment
FROM node:latest AS build
WORKDIR /app
COPY . .
RUN npm install && npm run build

RUN sleep 10
# production environment
FROM nginx:stable-alpine
WORKDIR /usr/share/nginx/html
RUN rm -rf ./*

COPY --from=build  /app/dist .
COPY --from=build /app/nginx/default.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
