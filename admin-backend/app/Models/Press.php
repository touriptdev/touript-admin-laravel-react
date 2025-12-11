<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Press extends Model
{
    use HasFactory;

    protected $fillable = ['title', 'slug', 'content', 'cover_image', 'created_by', ];

    protected $appends = ['cover_image_url'];

    public function getCoverImageUrlAttribute()
    {
        return $this->cover_image
            ? asset('storage/' . $this->cover_image)
            : null;
    }
    
}
