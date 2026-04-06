<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\ProjectController;
use App\Http\Controllers\Api\SkillController;
use App\Http\Controllers\Api\ExperienceController;
use App\Http\Controllers\Api\EducationController;
use App\Http\Controllers\Api\CertificateController;
use App\Http\Controllers\Api\ContactController;
use App\Http\Controllers\Api\TestimonialController;
use App\Http\Controllers\Api\BlogController;

// ✅ PUBLIC ROUTES
Route::get('/projects', [ProjectController::class, 'index']);
Route::get('/projects/{id}', [ProjectController::class, 'show']);
Route::get('/skills', [SkillController::class, 'index']);
Route::get('/experiences', [ExperienceController::class, 'index']);
Route::get('/educations', [EducationController::class, 'index']);
Route::get('/certificates', [CertificateController::class, 'index']);
Route::post('/contacts', [ContactController::class, 'store']);
Route::get('/testimonials', [TestimonialController::class, 'index']);
Route::get('/blogs', [BlogController::class, 'index']);

// 🔐 AUTH
Route::post('/login', [AuthController::class, 'login']);

// 🔐 ADMIN ROUTES
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/me', [AuthController::class, 'me']);

    Route::post('/projects', [ProjectController::class, 'store']);
    Route::put('/projects/{id}', [ProjectController::class, 'update']);
    Route::delete('/projects/{id}', [ProjectController::class, 'destroy']);

    Route::post('/skills', [SkillController::class, 'store']);
    Route::put('/skills/{id}', [SkillController::class, 'update']);
    Route::delete('/skills/{id}', [SkillController::class, 'destroy']);

    Route::post('/experiences', [ExperienceController::class, 'store']);
    Route::put('/experiences/{id}', [ExperienceController::class, 'update']);
    Route::delete('/experiences/{id}', [ExperienceController::class, 'destroy']);

    Route::post('/educations', [EducationController::class, 'store']);
    Route::put('/educations/{id}', [EducationController::class, 'update']);
    Route::delete('/educations/{id}', [ExperienceController::class, 'destroy']);

    Route::post('/certificates', [CertificateController::class, 'store']);
    Route::put('/certificates/{id}', [CertificateController::class, 'update']);
    Route::delete('/certificates/{id}', [CertificateController::class, 'destroy']);

    Route::get('/contacts', [ContactController::class, 'index']);
    Route::patch('/contacts/{id}/read', [ContactController::class, 'markRead']);
    Route::delete('/contacts/{id}', [ContactController::class, 'destroy']);

    Route::post('/testimonials', [TestimonialController::class, 'store']);
    Route::put('/testimonials/{id}', [TestimonialController::class, 'update']);
    Route::delete('/testimonials/{id}', [TestimonialController::class, 'destroy']);

    Route::post('/blogs', [BlogController::class, 'store']);
    Route::put('/blogs/{id}', [BlogController::class, 'update']);
    Route::delete('/blogs/{id}', [BlogController::class, 'destroy']);
});

Route::get('/blogs/{id}', [BlogController::class, 'show']);