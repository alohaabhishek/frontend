# Use Node image
FROM node:20.11.0-alpine

# Set working directory
WORKDIR /app

# Copy dependency files
COPY package*.json ./

# Install dependencies
RUN npm ci --legacy-peer-deps

# Copy project files
COPY . .

# Expose React port
EXPOSE 3000

# Start React app
CMD ["npm", "start"]