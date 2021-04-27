FROM node:15-alpine

WORKDIR /app
COPY package.json .
RUN npm install
COPY . .

ARG DEFAULT_PORT=8000
ENV AUTH_PORT=8080
ENV SERVER_PORT=${DEFAULT_PORT}
ENV AUTH_URL=http://ff-au:${AUTH_PORT}/login

EXPOSE $DEFAULT_PORT
CMD [ "npm", "run", "build" ]
