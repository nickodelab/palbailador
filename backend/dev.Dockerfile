FROM node:10-alpine

WORKDIR '/backend'
COPY package.json .
RUN npm install

COPY . .

CMD ["npm", "start"]