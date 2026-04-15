FROM php:8.4-fpm-alpine

# Install dependencies sistem yang dibutuhkan untuk Laravel & PostgreSQL
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

# Install extension PHP untuk database dan optimasi
RUN docker-php-ext-install pdo pdo_pgsql zip mbstring

# Install Composer terbaru
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Set working directory ke /app
WORKDIR /app

# Copy seluruh kodingan backend ke dalam container
COPY . .

# Install library laravel (tanpa dev tool agar ringan)
RUN composer install --no-dev --optimize-autoloader

# Berikan izin akses folder storage & cache (Wajib agar tidak Error 500)
RUN chmod -R 777 storage bootstrap/cache

# Jalankan server Laravel
# Port akan diambil otomatis dari Railway
CMD php artisan serve --host=0.0.0.0 --port=${PORT:-8080}