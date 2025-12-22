FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY prisma ./prisma/
RUN npx prisma generate
CMD ["npx", "prisma", "migrate", "deploy"]

# npx prisma migrate dev