FROM node:12.9.1-alpine as builder

RUN mkdir -p /srv/app/client

WORKDIR /srv/app/client/

COPY package.json /srv/app/client

RUN npm install

COPY . /srv/app/client/

# CMD ["npm", "run", "build" ]
RUN npm run build

FROM nginx 
EXPOSE 3000
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /srv/app/client/build /usr/share/nginx/html