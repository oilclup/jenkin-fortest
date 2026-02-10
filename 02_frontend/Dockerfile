# Build stage
FROM node:20-alpine AS builder
WORKDIR /app

# รับ build argument
ARG NEXT_PUBLIC_API_HOST
# ตั้งเป็น environment variable เพื่อให้ Next.js อ่านได้ตอน build
ENV NEXT_PUBLIC_API_HOST=${NEXT_PUBLIC_API_HOST}

COPY package*.json ./
RUN npm install  
COPY . .
RUN npm run build

# Production stage
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production

RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

USER nextjs
EXPOSE 3000
ENV PORT=3000

CMD ["node", "server.js"]