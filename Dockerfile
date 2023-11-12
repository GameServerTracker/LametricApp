FROM --platform=linux/amd64 node:latest

COPY . .

RUN yarn install
RUN yarn build
EXPOSE 3000

CMD yarn start:dev
