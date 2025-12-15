FROM node:20-alpine

ENV VITE_AUTH_BACK_URL=${VITE_AUTH_BACK_URL}
ENV VITE_LOGIC_BACK_URL=${VITE_LOGIC_BACK_URL}


WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY prisma ./prisma/
RUN npx prisma generate
COPY . .
EXPOSE 3002
CMD ["/bin/sh", "-c", "npx prisma migrate deploy && npm run start"]
