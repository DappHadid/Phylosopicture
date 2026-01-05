<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class NewsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $news = [
            // Berita 1
            [
                'title' => 'Andre Taulany dan Kawan-kawan Meriahkan Film Komedi Terbaru',
                'description' => "Sebuah film komedi segar yang ditunggu-tunggu akhirnya mengumumkan jajaran pemainnya. Andre Taulany, bersama dengan sahabat-sahabatnya dari dunia musik dangdut, dipastikan akan membintangi film berjudul 'Kang Solah X Nenek Gayung'. Film ini menjanjikan gelak tawa penonton dengan alur cerita yang unik dan dialog-dialog kocak khas para pemainnya.",
                'image' => 'https://source.unsplash.com/400x250/?comedy,movie',
                'date' => Carbon::now()->subDays(2),
                'category' => 'latest',
                'link' => 'https://example.com/news/andre-taulany-film-komedi',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            // Berita 2
            [
                'title' => 'Lagu "Senyum Membawa Luka" Diaransemen Ulang untuk Soundtrack Film',
                'description' => "Lagu legendaris yang pernah dipopulerkan oleh Meggy Z, 'Senyum Membawa Luka', akan hadir dalam versi baru. Lagu ini diaransemen ulang secara khusus untuk menjadi soundtrack utama film 'Kang Solah'. Dengan sentuhan musik modern namun tetap mempertahankan nuansa nostalgia, versi baru ini diharapkan dapat diterima oleh semua kalangan.",
                'image' => 'https://source.unsplash.com/400x250/?music,studio',
                'date' => Carbon::now()->subDays(5),
                'category' => 'achievement',
                'link' => 'https://example.com/news/soundtrack-senyum-membawa-luka',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            // Berita 3
            [
                'title' => 'Kolaborasi Epik Iwan Fals dan Isyana Sarasvati di Proyek Film Panji Tengkorak',
                'description' => "Dua musisi lintas generasi, Iwan Fals dan Isyana Sarasvati, mengumumkan kolaborasi mereka dalam sebuah proyek besar. Keduanya akan mengisi soundtrack untuk film laga legendaris yang dihidupkan kembali, 'Panji Tengkorak'. Duet ini dianggap sebagai salah satu kolaborasi paling ditunggu tahun ini.",
                'image' => 'https://source.unsplash.com/400x250/?concert,singer',
                'date' => Carbon::now()->subDays(8),
                'category' => 'newsEvent',
                'link' => 'https://example.com/news/iwan-fals-isyana-panji-tengkorak',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            // Berita 4 (Tambahan)
            [
                'title' => 'Film "Tanah Air" Raih Penghargaan Best Cinematography di Festival Film Internasional',
                'description' => "Kabar membanggakan datang dari industri perfilman Indonesia. Film drama 'Tanah Air' berhasil memenangkan penghargaan untuk kategori Sinematografi Terbaik di ajang International Film Festival of Asia. Kemenangan ini membuktikan kualitas sineas tanah air yang mampu bersaing di kancah global.",
                'image' => 'https://source.unsplash.com/400x250/?award,trophy',
                'date' => Carbon::now()->subDays(10),
                'category' => 'achievement',
                'link' => 'https://example.com/news/tanah-air-menang-penghargaan',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            // Berita 5 (Tambahan)
            [
                'title' => 'Teaser Perdana Film Animasi "Petualangan Nusantara" Resmi Dirilis',
                'description' => "Rumah produksi animasi terkemuka, AnimaWorks, akhirnya merilis teaser perdana untuk film terbaru mereka, 'Petualangan Nusantara'. Teaser berdurasi satu menit ini menampilkan visual yang memukau dan karakter-karakter unik yang terinspirasi dari cerita rakyat Indonesia. Film ini dijadwalkan tayang pada liburan akhir tahun.",
                'image' => 'https://source.unsplash.com/400x250/?animation,character',
                'date' => Carbon::now()->subDay(),
                'category' => 'latest',
                'link' => 'https://example.com/news/teaser-petualangan-nusantara',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            // Berita 6 (Tambahan)
            [
                'title' => 'Jakarta Film Week 2025 Akan Digelar Bulan Depan, Ini Daftar Filmnya!',
                'description' => "Acara tahunan yang paling ditunggu para pecinta film, Jakarta Film Week, akan kembali diselenggarakan. Tahun ini, festival akan memutar lebih dari 50 film dari berbagai negara, termasuk beberapa film yang akan tayang perdana di Indonesia. Acara ini juga akan diisi dengan sesi diskusi bersama sutradara dan aktor ternama.",
                'image' => 'https://source.unsplash.com/400x250/?cinema,projector',
                'date' => Carbon::now()->subDays(15),
                'category' => 'newsEvent',
                'link' => 'https://example.com/news/jakarta-film-week-2025',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
             // Berita 7 (Tambahan)
             [
                'title' => 'Aktor Reza Rahadian Perankan Tokoh Pahlawan Nasional',
                'description' => "Aktor pemenang banyak penghargaan, Reza Rahadian, dikonfirmasi akan memerankan tokoh pahlawan nasional Pangeran Diponegoro dalam film biopik terbaru. Proyek film kolosal ini disebut-sebut sebagai salah satu produksi film termahal tahun ini dan melibatkan ribuan pemain figuran.",
                'image' => 'https://source.unsplash.com/400x250/?actor,portrait',
                'date' => Carbon::now()->subDays(4),
                'category' => 'latest',
                'link' => 'https://example.com/news/reza-rahadian-diponegoro',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            // Berita 8 (Tambahan)
            [
                'title' => 'Film Horor "Jelangkung Reborn" Tembus 2 Juta Penonton dalam Seminggu',
                'description' => "Film horor terbaru 'Jelangkung Reborn' berhasil mencatatkan prestasi luar biasa. Hanya dalam tujuh hari penayangannya, film ini sukses menarik lebih dari 2 juta penonton di seluruh bioskop Indonesia. Angka ini menjadikannya salah satu film dengan pembukaan minggu pertama terbaik tahun ini.",
                'image' => 'https://source.unsplash.com/400x250/?ghost,scary',
                'date' => Carbon::now()->subDays(9),
                'category' => 'achievement',
                'link' => 'https://example.com/news/jelangkung-reborn-box-office',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
        ];

        // Hapus data lama untuk menghindari duplikasi saat seeding ulang
        DB::table('news')->truncate();
        
        // Masukkan data baru
        DB::table('news')->insert($news);
    }
}