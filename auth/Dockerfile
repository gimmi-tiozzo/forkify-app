FROM node:15-alpine

WORKDIR /app
COPY package.json .
RUN npm install
COPY . .

ARG DEFAULT_PORT=8080
ENV SERVER_PORT=${DEFAULT_PORT}

EXPOSE $DEFAULT_PORT
CMD [ "npm", "run", "build"]