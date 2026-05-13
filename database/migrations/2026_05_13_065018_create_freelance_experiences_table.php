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
        Schema::create('freelance_experiences', function (Blueprint $table) {
            $table->id();
            $table->string('client_name');
            $table->string('project_name');
            $table->string('role');
            $table->string('project_type')->nullable();
            $table->date('start_date');
            $table->date('end_date')->nullable();
            $table->text('technologies')->nullable();
            $table->text('description')->nullable();
            $table->string('project_url')->nullable();
            $table->string('image')->nullable();
            $table->text('testimonial')->nullable();
            $table->string('status')->default('completed'); // completed, on-going
            $table->boolean('featured')->default(false);
            $table->integer('order')->default(0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('freelance_experiences');
    }
};
