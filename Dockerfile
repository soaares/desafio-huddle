FROM node:23

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install -g npm@11.2.0

RUN npm install

RUN npm audit fix

COPY . .

RUN npm run build

EXPOSE 8000

CMD ["npm", "start"]