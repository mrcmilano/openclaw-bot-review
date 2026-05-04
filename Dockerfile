# Build stage
FROM node:22-alpine AS builder

WORKDIR /app

COPY . .
RUN npm install && npm run build

# Production stage
FROM node:22-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production

# Copy standalone output
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public

EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# Authentication environment variables (set at runtime)
# ENV AUTH_USERNAME=admin
# ENV AUTH_PASSWORD=change-me-to-a-secure-password
# ENV AUTH_DISABLED=true  # Uncomment to disable auth (local-only use)

CMD ["node", "server.js"]
