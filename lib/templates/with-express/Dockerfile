FROM node:lts

WORKDIR /app

COPY package.json ./

RUN yarn install --prod

copy dist /app/dist

CMD [ "yarn", "start" ]
