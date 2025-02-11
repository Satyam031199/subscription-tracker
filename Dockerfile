# Use the official Node.js image as the base image
FROM node:20-alpine

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json first
COPY package*.json ./

# Install dependencies
RUN npm install && npm install -g nodemon

# Copy the rest of the application code
COPY . .

# Expose the application port
EXPOSE 5500

# Command to run the application
CMD ["npm", "run","dev"]
