# # Frontend Dockerfile
# FROM node:18

# WORKDIR /app

# COPY package*.json ./
# RUN npm install

# COPY . .

# # Build the React app
# RUN npm run build

# # Serve frontend using a lightweight server (nginx)
# FROM nginx:alpine
# COPY --from=0 /app/build /usr/share/nginx/html

# EXPOSE 3000

# CMD ["nginx", "-g", "daemon off;"]












# # Build stage
# FROM node:18 as build

# WORKDIR /app

# # Copy package.json and install dependencies
# COPY package*.json ./
# RUN npm install

# # Copy all frontend files and build React app
# COPY . .
# RUN npm run build

# # Serve with Nginx
# FROM nginx:stable-alpine

# # Copy build output to Nginx html directory
# COPY --from=build /app/build /usr/share/nginx/html

# # Expose frontend port
# EXPOSE 80

# CMD ["nginx", "-g", "daemon off;"]








# FROM node:18

# WORKDIR /app

# COPY package*.json ./
# RUN npm install

# COPY . .

# EXPOSE 3000

# CMD ["npm", "start"]









FROM node:18 AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Use nginx for serving static build
FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 3000
CMD ["nginx", "-g", "daemon off;"]
