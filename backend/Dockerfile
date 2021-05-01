FROM node:15-alpine

WORKDIR /app
COPY package.json .
RUN npm install
COPY . .

ARG DEFAULT_PORT=8000
ENV SERVER_PORT=${DEFAULT_PORT}
ENV AUTH_URL=http://ff-au:8080/login

EXPOSE $DEFAULT_PORT
CMD [ "npm", "run", "build" ]
