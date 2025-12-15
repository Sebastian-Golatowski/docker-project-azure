FROM node:20-alpine
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY prisma ./prisma/
RUN npx prisma generate
COPY . .
EXPOSE 3002
CMD ["/bin/sh", "-c", "npx prisma migrate deploy && npm run start"]
