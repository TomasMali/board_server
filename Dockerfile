 #Stage 1
 
 FROM node:latest as node

 WORKDIR /usr/src/app

 COPY package*.json ./

 RUN npm install

 COPY . .

 EXPOSE 3008

 CMD ["npm", "start"]

  