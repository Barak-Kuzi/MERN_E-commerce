# ---------- שלב 1: build ----------
FROM node:18-alpine AS build

WORKDIR /app

# העתקת קבצי dependencies
COPY package*.json ./

# התקנת כל התלויות (כולל dev בשביל TypeScript)
RUN npm install

# העתקת הקוד
COPY . .

# קומפילציה ל-JS
RUN npm run build


# ---------- שלב 2: production ----------
FROM node:18-alpine

WORKDIR /app

# התקנת dependencies בלבד (בלי dev)
COPY package*.json ./
RUN npm install --omit=dev

# העתקת הקוד הקומפילטיבי בלבד
COPY --from=build /app/dist ./dist

# פתיחת פורט
EXPOSE 8080

# הרצת השרת
CMD ["node", "dist/app.js"]