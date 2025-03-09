FROM node:22-slim

# Note: This base image will be pulled from Docker Hub.
# If you encounter authentication issues, you may need to:
# 1. Login to Docker Hub: docker login
# 2. Or use a local development approach without Docker (see LOCAL_DEPLOYMENT.md)

# Set the working directory
WORKDIR /app

# Install pnpm globally
RUN npm install -g pnpm serve

# Copy package management files
COPY package.json ./

# Install dependencies using pnpm
RUN pnpm install

# Copy the rest of the application files
COPY . .

# Runtime environment variables
ENV NODE_ENV=development
ENV ASTRO_TELEMETRY_DISABLED=1

# Expose the port
EXPOSE 3000

# Start development server
CMD ["pnpm", "run", "dev"]