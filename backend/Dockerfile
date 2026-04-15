FROM php:8.4-fpm-alpine

# Install dependencies sistem (WAJIB ADA postgresql-dev)
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

# Install extension PHP untuk database
RUN docker-php-ext-install pdo pdo_pgsql zip mbstring

# Install Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

WORKDIR /app
COPY . .

# Install library Laravel
RUN composer install --no-dev --optimize-autoloader

# Izin folder agar tidak Error 500
RUN chmod -R 777 storage bootstrap/cache

# Jalankan server
CMD php artisan serve --host=0.0.0.0 --port=${PORT:-8080}
