
# Use Node.js 18 Alpine as base image
FROM node:18-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./
COPY bun.lockb ./

# Install dependencies using npm (since we have package-lock.json)
RUN npm ci

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Production stage
FROM nginx:alpine

# Copy built assets from builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy custom nginx configuration
COPY nginx.conf /etc/nginx/nginx.conf

# Expose port 80
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
