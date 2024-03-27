FROM node:20.11.0


# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./
RUN npm install && npm install mongodb

# Bundle app source
COPY . .

CMD [ "node", "server.js" ]
