FROM node:15-alpine as builder
WORKDIR /app
COPY package.json .
RUN npm install
COPY . .
RUN npm run build

FROM nginx:latest
COPY --from=builder /app/dist /usr/share/nginx/html
COPY conf/nginx.conf /etc/nginx/conf.d/default.conf
RUN mkdir /app
COPY run-fe.sh /app
RUN chmod -R 777 /app/run-fe.sh

ARG DEFAULT_PORT=80
ENV BACKEND_PORT=8000

EXPOSE $DEFAULT_PORT
CMD [ "/app/run-fe.sh" ]