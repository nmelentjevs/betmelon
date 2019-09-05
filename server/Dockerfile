FROM nikolaik/python-nodejs:latest

RUN mkdir -p /srv/app/server

WORKDIR /srv/app/server/

COPY package.json /srv/app/server/

RUN npm install

COPY . /srv/app/server/

# CMD ["npm", "run", "dev"] 

CMD ./scripts/start.sh