# use node alpine at it is a small node image
FROM node:alpine

# create the folder where the app will live
RUN mkdir -p /app

# set the working directory in the container
WORKDIR /app

# copy package.json and package-lock.json into the workdir before install the dependencies
COPY package*.json ./

# install project dependencies
RUN npm install

# copy the rest of the application code to the working directory
COPY . .

# expose the port 3000
EXPOSE 3000

# run the application via command-line
ENTRYPOINT ["npm", "run", "dev"]