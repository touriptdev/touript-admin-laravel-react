<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    use HasFactory;

    // protected $appends = ['cover_image_url'];

    // public function getCoverImageUrlAttribute()
    // {
    //     if (!$this->cover_image) {
    //         return null;
    //     }

    //     // cover_image is like "cover_images/abc.jpg"
    //     return asset('storage/' . $this->cover_image);
    // }

    // protected $appends = ['cover_image_url'];

    // public function getCoverImageUrlAttribute()
    // {
    //     return $this->cover_image
    //         ? asset('storage/' . $this->cover_image)
    //         : null;
    // }

    // protected $fillable = [
    //     'title',
    //     'slug',
    //     // 'status',
    //     'content',
    //     'cover_image',
    // ];


    protected $fillable = ['title', 'slug', 'content', 'cover_image'];

    protected $appends = ['cover_image_url'];

    public function getCoverImageUrlAttribute()
    {
        return $this->cover_image
            ? asset('storage/' . $this->cover_image)
            : null;
    }
    
}
