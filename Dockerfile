# syntax = docker/dockerfile:1

ARG NODE_VERSION=21.6.2
FROM node:${NODE_VERSION}-slim as base

LABEL fly_launch_runtime="Next.js"

WORKDIR /app

# --- Add ARG and ENV ---
ARG NEXT_PUBLIC_API_BASE_URL
ENV NEXT_PUBLIC_API_BASE_URL=$NEXT_PUBLIC_API_BASE_URL

ENV NODE_ENV="production"

# Build Stage
FROM base as build

RUN apt-get update -qq && \
    apt-get install --no-install-recommends -y build-essential node-gyp pkg-config python-is-python3

COPY --link package-lock.json package.json ./
RUN npm ci --include=dev

COPY --link . .

# --- Use ARG during build ---
ARG NEXT_PUBLIC_API_BASE_URL
ENV NEXT_PUBLIC_API_BASE_URL=$NEXT_PUBLIC_API_BASE_URL

RUN npm run build
RUN npm prune --omit=dev

# Final Image
FROM base

COPY --from=build /app /app

EXPOSE 3000
CMD [ "npm", "run", "start" ]