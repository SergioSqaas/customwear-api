FROM node:16.14.2-alpine AS node

# Use /app as the CWD
WORKDIR /app       

# We need this to inspect the container with a live session
RUN apk add --no-cache bash

# We need this if we will validate audios here
RUN apk add  --no-cache ffmpeg

# Copy package.json and package-lock.json to /app
COPY package*.json ./

RUN npm cache clean --force

# Install all dependencies
RUN npm i               

# Copy the rest of the code
COPY . .                

# Invoke the build script to transpile ts code to js
RUN npm run build    

# Open desired port
EXPOSE 8080

ENTRYPOINT ["npm", "start"]