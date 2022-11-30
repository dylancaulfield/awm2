FROM nginx

COPY ./nginx/awm2.conf /etc/nginx/conf.d/awm2.conf

# Mkcert for local development
RUN mkdir -p /etc/nginx/pem
COPY ./nginx/mkcert.pem /etc/nginx/pem/mkcert.pem
COPY ./nginx/mkcert-key.pem /etc/nginx/pem/mkcert-key.pem

# Copy static files from vue dist
COPY ./vue/dist /var/www;