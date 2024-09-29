# Dockerfile - Production setup

# Step 1: Build stage
FROM node:18-alpine AS builder

# Step 2: Set the working directory inside the container
WORKDIR /app

# Step 3: Copy the package.json and yarn.lock for dependency installation
COPY package.json yarn.lock ./

# Step 4: Install dependencies
RUN yarn install --frozen-lockfile

# Step 5: Copy the rest of the application code
COPY . .

# Step 6: Build the Next.js application
RUN yarn build

# Step 7: Install 'serve' to serve the production build
RUN yarn global add serve

# Step 8: Final stage - Use a minimal image for production
FROM node:18-alpine

# Step 9: Set the working directory in the new container
WORKDIR /app

# Step 10: Copy the production build from the builder stage
COPY --from=builder /app ./

# Step 11: Expose the port
EXPOSE 3000

# Step 12: Start the production server
CMD ["yarn", "start"]
