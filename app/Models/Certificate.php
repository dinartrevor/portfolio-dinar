<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Certificate extends Model
{
    protected $table = 'certificates';
    protected $fillable = ['title', 'issuer', 'issue_date', 'credential_url', 'image'];
}
