FROM node:12.7.0-buster-slim as builder
ARG build_mode
RUN npm install -g @angular/cli@8.1.3
WORKDIR /build

COPY package.json package.json
RUN npm install

COPY . .
RUN ng build ${build_mode}

FROM nginx
RUN rm /etc/nginx/conf.d/default.conf

WORKDIR /app
COPY --from=builder /build/dist/password-frontend/* /app/
COPY ./site.conf /etc/nginx/conf.d/

EXPOSE 80
