# pull alpine image
FROM node:14-alpine

# create a working directory context
WORKDIR var/www/funCharge

# little optimization for rebuilding container
COPY ./package.json ./
# install dependencies
RUN npm install

# copy working dir
COPY ./ ./

# run the server
CMD ["npm","start"]
