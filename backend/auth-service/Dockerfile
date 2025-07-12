FROM node:20

WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
COPY .env ./
RUN npm run build
EXPOSE 3003

CMD ["sh", "-c", "npm run db:deploy && npm run start:prod"]