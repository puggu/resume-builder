FROM nginx:1.16-alpine
COPY gzip.conf /etc/nginx/conf.d/
COPY route_nginx.conf /etc/nginx/conf.d/
COPY /build /usr/share/nginx/html