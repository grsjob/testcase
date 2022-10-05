FROM node:16.17.0-alpine

COPY package.json .

RUN npm install --quiet

COPY . .
