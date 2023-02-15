FROM node:18-alpine

WORKDIR /app

COPY . ./

RUN pnpm i --prod

RUN pnpm i webpack webpack-node-externals tsconfig-paths-webpack-plugin -D

RUN pnpm build

RUN pnpm remove webpack webpack-node-externals tsconfig-paths-webpack-plugin

COPY dist ./dist

CMD [ "yarn", "start" ]
