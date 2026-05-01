# ---------- שלב 1: build ----------
FROM node:18-alpine AS build

WORKDIR /app

# התקנת dependencies
COPY package*.json ./
RUN npm install

# העתקת הקוד
COPY . .

# build ל-production
RUN npm run build


# ---------- שלב 2: nginx ----------
FROM nginx:alpine

# העתקת הקבצים הבנויים
COPY --from=build /app/build /usr/share/nginx/html

RUN touch /usr/share/nginx/html/env.js

# פתיחת פורט
EXPOSE 80

# הרצת nginx
CMD ["nginx", "-g", "daemon off;"]