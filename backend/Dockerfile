FROM php:8.4-fpm-alpine

# Install dependencies
RUN apk add --no-cache nginx curl zip unzip git \
    && docker-php-ext-install pdo pdo_pgsql

# Install Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Set working directory
WORKDIR /var/www

# Copy project
COPY . .

# Install Laravel dependencies
RUN composer install --optimize-autoloader --no-dev

# Set permissions
RUN chown -R www-data:www-data /var/www/storage /var/www/bootstrap/cache

# Copy nginx config
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 10000

CMD php artisan config:cache && php artisan route:cache && php-fpm -D && nginx -g "daemon off;"