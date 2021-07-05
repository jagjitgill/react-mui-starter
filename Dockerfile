# stage: 1
FROM node:14.17.1-alpine as react-build
WORKDIR /app

COPY . ./
# Credentials for local development
COPY docker/.env.local ./.env.local

RUN yarn install
RUN yarn build

# stage: 2 — the production environment
FROM nginx:alpine
COPY --from=react-build /app/build /usr/share/nginx/html

COPY docker/default.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
