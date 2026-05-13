<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class FreelanceExperience extends Model
{
    protected $fillable = [
        'client_name', 'project_name', 'role', 'project_type', 
        'start_date', 'end_date', 'technologies', 'description', 
        'project_url', 'image', 'testimonial', 'status', 'featured', 'order'
    ];

    protected $casts = [
        'technologies' => 'array',
        'featured' => 'boolean',
        'start_date' => 'date',
        'end_date' => 'date',
    ];
}
