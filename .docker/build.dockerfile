# Base image with Node.js 18
FROM node:18-alpine

# Set working directory in the container
WORKDIR /usr/app

# Install Python and build dependencies for native modules
RUN apk add --no-cache python3 make g++

# Copy package.json and package-lock.json (or npm-shrinkwrap.json)
COPY package*.json ./

# Install all dependencies
RUN npm install

# Copy the source code of the application
COPY . .

# Build the application
RUN npm run build

# Expose the port the app runs on
EXPOSE 3000

# Start the application
CMD ["npm", "run", "start"]
