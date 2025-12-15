# FROM node:20-alpine
# RUN apk add --no-cache curl
# WORKDIR /usr/src/app
# COPY package*.json ./
# RUN npm install --omit=dev
# COPY . .
# CMD ["sh", "-c", "npx prisma generate && npm start"]

FROM node:20-alpine

ENV DATABASE_URL=${DATABASE_URL}
ENV JWT_SECRET=${JWT_SECRET}

WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY prisma ./prisma/
RUN npx prisma generate
COPY . .
EXPOSE 3001
CMD ["npm", "run", "start"]