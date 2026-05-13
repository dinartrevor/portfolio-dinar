<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Hobby extends Model
{
    protected $fillable = ['name', 'icon', 'description', 'order', 'is_active'];
}
