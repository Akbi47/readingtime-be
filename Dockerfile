FROM node:18.16.0-alpine as builder
WORKDIR /usr/src/app

COPY --chown=node:node package*.json yarn.lock ./

RUN apk add --no-cache git
RUN yarn install

COPY --chown=node:node . .

RUN yarn global add pm2
RUN yarn global add @nestjs/cli
RUN yarn build
RUN rm -r node_modules
RUN yarn install --frozen-lockfile --production

# BUILD
FROM node:18.16.0-alpine as production
WORKDIR /usr/src/app

COPY --chown=node:node package*.json yarn.lock ./
COPY --chown=node:node .env.development ./.env
RUN yarn install --production
COPY --chown=node:node . .

COPY --from=builder /usr/src/app/dist ./dist
EXPOSE 3000
CMD ["pm2-runtime", "dist/main.js"]