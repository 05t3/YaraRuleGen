# Base image
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Set environment variables
ENV NODE_ENV=development

# Copy package files & install dependencies
COPY package*.json ./

RUN npm install --omit=dev

# Copy everything else
COPY . .

# Expose port
EXPOSE 5000

# Command can be overridden with CMD in docker-compose
CMD ["npm", "run", "dev"]