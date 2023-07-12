# Use official node image as the base image
FROM node:16-alpine as build

# Set the working directory as app
WORKDIR /app

# Add the source code to app
COPY . .

# Install the dependencies
RUN npm install -g npm@9.8.0
RUN npm install

# Generate the build of the application
RUN npm run build

# Use official nginx image as the base image
FROM nginx:alpine

# Copy the build output for nginx contents
COPY --from=build /app/dist/policy /usr/share/nginx/html

# Expose Port
EXPOSE 80