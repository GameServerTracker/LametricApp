FROM --platform=linux/amd64 node:20-alpine

COPY . .

RUN yarn install
RUN yarn build
EXPOSE 3000

CMD yarn start:prod
