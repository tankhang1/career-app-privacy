# Use an official Node.js image as the base for building the app
FROM node:20-alpine as build

# Set the working directory
WORKDIR /app

# Copy the package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the application code and build the app
COPY . .
RUN npm run release

# Use an official NGINX image as the base for serving the app
FROM nginx:alpine

# Copy the built files from the previous stage
COPY --from=build /app/dist /usr/share/nginx/html

# Copy custom nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80 and start NGINX
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]