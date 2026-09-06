FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
COPY packages/backend/package*.json ./packages/backend/
COPY packages/backend/prisma ./packages/backend/prisma

RUN npm install
RUN cd packages/backend && npm install

COPY packages/backend ./packages/backend

RUN cd packages/backend && npm run build

EXPOSE 3001

CMD ["npm", "run", "start", "-w", "packages/backend"]
