<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\News; // Pastikan Model News di-import
use Inertia\Inertia;

class NewsController extends Controller
{
    /**
     * Menampilkan daftar semua berita.
     */
    public function index()
    {
        // 1. Ambil semua berita, diurutkan berdasarkan tanggal terbaru
        $news = News::orderBy('date', 'desc')->get()->map(function ($item) {
            // 2. Modifikasi path gambar untuk setiap item berita
            // Ini adalah perbaikan penting agar gambar bisa tampil
            $item->image = url('storage/' . $item->image);
            return $item;
        });

        // 3. Render komponen Inertia dengan data berita yang sudah diubah
        return Inertia::render('User/Dashboard/News', [
            'news' => $news,
        ]);
    }

    /**
     * Menampilkan detail satu berita.
     * Menggunakan Route Model Binding (News $news) untuk kode yang lebih bersih.
     */
    public function show(News $news) // Menggunakan Route Model Binding
    {
        // 1. Modifikasi path gambar untuk berita yang dipilih
        // Ini juga penting agar gambar di halaman detail tampil
        $news->image = url('storage/' . $news->image);

        // 2. Render komponen Inertia dengan data berita tunggal
        return Inertia::render('User/Dashboard/NewsDetail', [
            'news' => $news,
        ]);
    }
}