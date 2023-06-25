FROM node:18-alpine as build

WORKDIR /app

COPY . .

RUN npm ci
RUN npm run build

FROM node:18-alpine

WORKDIR /app

COPY --from=build /app/build ./build
RUN npm install -g serve

ENV NODE_ENV production

EXPOSE 80

CMD ["npx", "serve", "build", "-l", "80"]
