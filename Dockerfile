FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
COPY prisma ./prisma
COPY .env ./
COPY tsconfig.json ./
RUN npm install
COPY . .
RUN npm install pm2 -g
RUN npx prisma generate
EXPOSE 3000
CMD ["pm2-runtime","start","npm","--","start"]

