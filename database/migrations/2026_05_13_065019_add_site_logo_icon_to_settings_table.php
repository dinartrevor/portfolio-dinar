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
        \DB::table('settings')->updateOrInsert(
            ['key' => 'site_logo_icon'],
            ['value' => null, 'group' => 'site', 'created_at' => now(), 'updated_at' => now()]
        );
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        \DB::table('settings')->where('key', 'site_logo_icon')->delete();
    }
};
