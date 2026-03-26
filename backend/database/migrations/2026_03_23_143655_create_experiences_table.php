<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('experiences', function (Blueprint $table) {
            $table->id();
            $table->string('company');
            $table->string('role');
            $table->text('description')->nullable();
            $table->json('tags')->nullable();
            $table->string('start_date');
            $table->string('end_date')->nullable();
            $table->enum('status', ['active', 'done', 'upcoming'])->default('done');
            $table->enum('type', ['work', 'organization'])->default('work');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('experiences');
    }
};
