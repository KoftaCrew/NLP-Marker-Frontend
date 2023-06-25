FROM node:18-alpine as build

WORKDIR /app

COPY . .

RUN npm ci
RUN npm run build

FROM node:18-alpine

WORKDIR /app

COPY --from=build /app/build ./build

ENV NODE_ENV production

EXPOSE 3000

CMD ["npx", "serve", "build"]
