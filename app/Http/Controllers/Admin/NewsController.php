<?php

namespace App\Http\Controllers\Admin;

use App\Models\News;
use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Storage;


class NewsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $news = News::latest()->get(); 

        return Inertia::render('Admin/News/Index', [
            'news' => $news,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
{
    return Inertia::render('Admin/News/Create');
}

    /**
     * Store a newly created resource in storage.
     */
public function store(Request $request)
{
    // 1. Validasi data yang masuk
    $validated = $request->validate([
        'title' => 'required|string|max:255',
        'image' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
        'date' => 'required|date',
        'category' => 'required|string|in:latest,achievement,newsEvent',
        'link' => 'nullable|url',
    ]);

    // 2. Handle file upload
    if ($request->hasFile('image')) {
        // Simpan gambar di folder 'public/news_images'
        // dan simpan path-nya ke dalam array validated
        $validated['image'] = $request->file('image')->store('news_images', 'public');
    }

    // 3. Simpan data ke database
    News::create($validated);

    // 4. Redirect kembali ke halaman index dengan pesan sukses
    return Redirect::route('admin.news.index')->with('success', 'News created successfully!');
}

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(News $news)
{
    // Render komponen Edit dan kirim data 'news' yang akan diubah
    return Inertia::render('Admin/News/Edit', [
        'news' => $news,
    ]);
}

    /**
     * Update the specified resource in storage.
     */
public function update(Request $request, News $news)
{
    // 1. Validasi, buat 'image' opsional
    $validated = $request->validate([
        'title' => 'required|string|max:255',
        'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048', // 'nullable'
        'date' => 'required|date',
        'category' => 'required|string|in:latest,achievement,newsEvent',
        'link' => 'nullable|url',
    ]);

    // 2. Cek jika ada file gambar baru yang di-upload
    if ($request->hasFile('image')) {
        // Hapus gambar lama jika ada
        if ($news->image) {
            Storage::disk('public')->delete($news->image);
        }
        // Upload gambar baru dan update path-nya
        $validated['image'] = $request->file('image')->store('news_images', 'public');
    }

    // 3. Update data di database
    $news->update($validated);

    // 4. Redirect kembali dengan pesan sukses
    return Redirect::route('admin.news.index')->with('success', 'News updated successfully!');
}


    /**
     * Remove the specified resource from storage.
     */
public function destroy(News $news) // Gunakan Route Model Binding lagi
{
    // 1. Hapus file gambar dari storage untuk menghemat ruang
    if ($news->image) {
        Storage::disk('public')->delete($news->image);
    }

    // 2. Hapus data dari database
    $news->delete();

    // 3. Redirect kembali ke halaman index dengan pesan sukses
    return Redirect::route('admin.news.index')->with('success', 'News deleted successfully!');
    }
}
