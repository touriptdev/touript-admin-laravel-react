<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Event extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'slug',
        'description',
        'location',
        'start_at',
        'end_at',
        'banner_image',
        'published_at',
        'created_by'
    ];
    protected $casts = [
        'start_at'=>'datetime',
        'end_at'=>'datetime',
        'published_at'=>'datetime'
    ];
    public function author() { return $this->belongsTo(User::class, 'created_by'); }
    public function scopePublished($q) { return $q->whereNotNull('published_at'); }
    }
