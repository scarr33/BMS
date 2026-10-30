# build phase
FROM node:20-alpine AS build

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run build

# production stage deployment

FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

RUN npm ci --omit=dev

COPY --from=build /app/dist ./dist

# Change the owndership from app files to node user 
RUN chown -R node:node /app && chmod -R 755 /app

RUN npm install pm2 -g

COPY ecosystem.config.js .
COPY start.sh .

RUN chmod +x start.sh

USER node

EXPOSE 9000

CMD ["sh", "start.sh"]