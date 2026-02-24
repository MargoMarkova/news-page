# docker build -t markovvn1/500na700 .
# docker run -it --rm -p 80:80 markovvn1/website-cv

FROM node:20 AS build

ENV DEBIAN_FRONTEND=noninteractive
ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production
ENV NEXT_PUBLIC_BACKEND_URL=""

COPY package.json package-lock.json /app/

RUN set -ex \
	&& cd /app && npm install

COPY . /app

RUN set -ex \
	&& cd /app && npm run build



FROM node:20-slim

ENV NEXT_TELEMETRY_DISABLED=1
ENV NEXT_PUBLIC_BACKEND_URL=""

COPY --from=build /app/.next /app/.next

COPY --from=build /app/.next/standalone /app/
COPY --from=build /app/public /app/public
COPY --from=build /app/.next/static /app/.next/static

WORKDIR /app

ENV PORT=80
ENV HOSTNAME="0.0.0.0"

ENTRYPOINT ["node", "server.js"]

