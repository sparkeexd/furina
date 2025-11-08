FROM mcr.microsoft.com/devcontainers/typescript-node:22 AS base
WORKDIR /workspace/furina
COPY package*.json ./

FROM base AS dev
COPY . .
RUN npm install

FROM dev AS builder
RUN npm run build

FROM node:22-bookworm-slim AS production
COPY --from=builder /workspace/furina/dist ./dist
USER node
CMD ["node", "dist/main.js"]
