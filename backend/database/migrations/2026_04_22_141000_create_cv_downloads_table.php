<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('cv_downloads', function (Blueprint $name) {
            $name->id();
            $name->string('name');
            $name->string('email');
            $name->string('status');
            $name->string('company')->nullable();
            $name->text('reason');
            $name->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('cv_downloads');
    }
};
