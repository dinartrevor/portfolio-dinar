<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    protected $fillable = ['title', 'description', 'thumbnail', 'demo_url', 'github_url', 'category', 'is_featured', 'order'];

    protected $casts = [
        'is_featured' => 'boolean',
    ];
}
