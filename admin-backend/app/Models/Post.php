<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Post extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'slug',
        'content',
        'cover_image',
        'published_at',
        'created_by'
    ];
    protected $casts = [
        'published_at' => 'datetime'
    ];
    public function author() { return $this->belongsTo(User::class, 'created_by'); }
    public function scopePublished($q) { return $q->whereNotNull('published_at'); }
}
