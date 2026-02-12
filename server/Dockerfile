FROM node:18-alpine

WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install --production

COPY src ./src
COPY mcp.json ./mcp.json

EXPOSE 8787
CMD ["node", "src/index.js"]
