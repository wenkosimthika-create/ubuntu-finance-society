FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
COPY packages/frontend/package*.json ./packages/frontend/

RUN npm install
RUN cd packages/frontend && npm install

COPY packages/frontend ./packages/frontend

RUN cd packages/frontend && npm run build

EXPOSE 3000

CMD ["npm", "run", "start", "-w", "packages/frontend"]
