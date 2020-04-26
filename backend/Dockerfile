# not a good idea get node from the latest 
# because if the image get updated you can mess you app :(
# FROM node:latest 
# Much better get a stable version, like version 10
FROM node:10

# where our application live
WORKDIR /usr/src/app

# we want to move out package.json file inside our container
COPY package*.json ./

RUN npm install

# COPY all from here (workdir) into our container
COPY . .

# prepare the port 3000 to receive connection into our container
EXPOSE 3000

CMD ["npm", "start"]
