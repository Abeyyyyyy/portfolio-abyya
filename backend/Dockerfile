FROM php:8.4-fpm-alpine

# Install dependencies sistem yang lengkap
RUN apk add --no-cache \
    nginx \
    curl \
    zip \
    unzip \
    git \
    libpq-dev \
    postgresql-dev \
    libzip-dev \
    oniguruma-dev

# Install extension PHP
RUN docker-php-ext-install pdo pdo_pgsql zip mbstring

# Install Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

WORKDIR /app
COPY . .

RUN composer install --no-dev --optimize-autoloader
RUN chmod -R 777 storage bootstrap/cache

CMD php artisan serve --host=0.0.0.0 --port=${PORT:-8080}
