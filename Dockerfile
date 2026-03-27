# ============================================================
# Dockerfile — Noel Group Next.js App (Production)
# Node 20 Alpine | Multi-stage | Standalone output
# ============================================================

# ----------------------------
# Stage 1: Install dependencies
# ----------------------------
FROM node:20-alpine AS deps

RUN apk add --no-cache libc6-compat

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci


# ----------------------------
# Stage 2: Build the app
# ----------------------------
FROM node:20-alpine AS builder

WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Disable Next.js telemetry during build
ENV NEXT_TELEMETRY_DISABLED=1

# Build using standalone output (set in next.config.ts)
RUN npm run build


# ----------------------------
# Stage 3: Production runner
# ----------------------------
FROM node:20-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Create a non-root user for security
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

# Copy standalone build output
COPY --from=builder /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY --from=builder /app/public ./public

USER nextjs

EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME=0.0.0.0

# Standalone mode uses server.js directly (much smaller image)
CMD ["node", "server.js"]
