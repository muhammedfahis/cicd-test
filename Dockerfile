FROM node

WORKDIR /var/nodeapp

COPY ./package.json ./

RUN npm install

RUN npm install -g pm2

COPY ./ ./

EXPOSE 5001

CMD ["npm","start"]