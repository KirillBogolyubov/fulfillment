FROM hub.cifrum-digital.ru/dockerhub-proxy/library/node:16.17.1 as builder

ARG VITE_APP_HOST
ENV NODE_ENV=production

WORKDIR /app

COPY . .

RUN yarn install \
  --prefer-offline \
  --frozen-lockfile \
  --non-interactive \
  --production=false
RUN yarn generate

FROM hub.cifrum-digital.ru/dockerhub-proxy/library/nginx:stable-alpine
WORKDIR /usr/share/nginx
# Remove default nginx static assets
RUN rm -rf ./*
COPY --chown=nginx --from=builder /app/dist /usr/share/nginx/html

# implement changes required to run NGINX as an unprivileged user
RUN sed -i 's,listen       80;,listen       8080;,' /etc/nginx/conf.d/default.conf \
    && sed -i '/user  nginx;/d' /etc/nginx/nginx.conf \
    && chown -R nginx /var/cache/nginx \
    && chmod -R g+w /var/cache/nginx \
    && chown -R nginx /etc/nginx \
    && chmod -R g+w /etc/nginx

USER nginx
EXPOSE 8080
ENTRYPOINT ["nginx", "-g", "daemon off;"]
