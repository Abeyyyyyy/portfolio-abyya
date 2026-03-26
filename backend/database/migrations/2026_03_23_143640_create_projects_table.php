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
    Schema::create('projects', function (Blueprint $table) {
        $table->id();
        $table->string('name');
        $table->text('description');
        $table->string('thumbnail')->nullable();
        $table->json('tech_stack');
        $table->string('github_url')->nullable();
        $table->string('demo_url')->nullable();
        $table->enum('status', ['done', 'on_progress', 'planned'])->default('planned');
        $table->boolean('is_featured')->default(false);
        $table->integer('order')->default(0);
        $table->timestamps();
    });
}

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('projects');
    }
};
