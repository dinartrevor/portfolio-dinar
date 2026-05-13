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
        Schema::table('certificates', function (Blueprint $table) {
            $table->string('credential_id')->nullable()->after('issue_date');
            $table->text('description')->nullable()->after('image');
            $table->integer('order')->default(0)->after('description');
            $table->boolean('is_featured')->default(false)->after('order');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('certificates', function (Blueprint $table) {
            $table->dropColumn(['credential_id', 'description', 'order', 'is_featured']);
        });
    }
};
