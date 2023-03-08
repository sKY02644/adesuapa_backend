FROM node:16-alpine as development

WORKDIR /app

COPY package*.json .

RUN npm install

COPY . .

RUN npm run build

FROM node:16-alpine as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /app

COPY package*.json .

RUN npm ci --only=production

COPY --from=development /app/dist ./dist

RUN apk update && apk add bash

RUN apk add --no-cache git

RUN git clone https://github.com/vishnubob/wait-for-it.git

CMD ["node", "dist/index.js"]