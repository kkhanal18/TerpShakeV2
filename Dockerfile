FROM node:20-alpine

WORKDIR /app

# Install root dependencies
COPY package.json ./
RUN npm install

# Install and build React client
COPY client/package.json ./client/
RUN cd client && npm install --legacy-peer-deps

COPY . .

RUN cd client && SKIP_PREFLIGHT_CHECK=true npm run build

EXPOSE 5001

CMD ["node", "server.js"]
