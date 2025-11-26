# 1) Build Angular app
FROM node:18 AS builder
WORKDIR /app

COPY package*.json ./
RUN npm ci --legacy-peer-deps

COPY . .
ENV NODE_OPTIONS=--max-old-space-size=4096
RUN npm run build -- --configuration production

# 2) Serve using Nginx
FROM nginx:alpine
COPY --from=builder /app/dist/ecommerce-frontend /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
