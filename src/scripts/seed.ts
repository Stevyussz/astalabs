import mongoose from 'mongoose';
import { createHash } from 'crypto';
import * as dotenv from 'dotenv';

// Load env vars
dotenv.config({ path: '.env.local' });

const MONGODB_URI = process.env.MONGODB_URI ?? 'mongodb://localhost:27017/ctf-yusril';

function hashFlag(flag: string): string {
  return createHash('sha256').update(flag.trim()).digest('hex');
}

// THE 5 REAL CTF CHALLENGES INTEGRATED TO ASTALABS
const challenges = [
  {
    title: 'Mata Batin',
    category: 'web',
    difficulty: 'easy',
    description: `Gak semua rahasia dikunci rapat. Kadang cuma butuh 'mata elang' buat lihat apa yang tersembunyi di balik layar.\n\n*Lokasi Lab*: Buka menu **Academy > Web Security 101** atau langsung ke \`/labs/mata-batin\`.\n\nNote: Engineer kita kayaknya kemarin buru-buru deploy terus lupa hapus notes-nya.`,
    flag: 'CTF{m4t4_b4t1n_mu_t4j3m_b4ng3t}',
    points: 100,
    hints: [
      { content: "Developer web sering meninggalkan komentar di kode HTML. Bedanya, yang baca bukan cuma developer lain, tapi juga hacker. Coba Inspect Element (Ctrl+Shift+I).", cost: 10 },
      { content: "Cek baris paling bawah dari *page source* (Ctrl+U).", cost: 25 },
    ],
  },
  {
    title: 'Biskuit Admin',
    category: 'web',
    difficulty: 'medium',
    description: `Sistem login admin lagi down, tapi halaman dashboard-nya masih bisa diakses. Cuma kok aksesnya ditolak terus ya?\n\n*Lokasi Lab*: \`/labs/biskuit-admin\`\n\nCoba cari tau gimana si server bedain antara 'guest' dan 'admin'. Kayaknya ada yang aneh dengan kue (cookie) yang mereka kasih.`,
    flag: 'CTF{3nc0d3d_c00k13_m4n1pul4t10n_succ3ss}',
    points: 250,
    hints: [
      { content: "Lihat isi *Cookies* di tab Storage/Application DevTools kamu. Z3Vlc3Q= itu apa ya?", cost: 20 },
      { content: "Format itu namanya Base64. Z3Vlc3Q= adalah 'guest'. Terus kalau 'admin' apa jadinya?", cost: 30 },
    ],
  },
  {
    title: 'Bocor Halus',
    category: 'web',
    difficulty: 'medium',
    description: `AstaLabs punya direktori karyawan yang *katanya* aman karena gak ada data sensitif di tampilannya.\n\n*Lokasi Lab*: \`/labs/bocor-halus\`\n\nTugas santaimu: Cek deh gimana data karyawan itu diambil dari server ke browser. Jangan-jangan ada data ekstra yang bocor secara halus.`,
    flag: 'CTF{4p1_l34k_1s_r34l_t00_r34l}',
    points: 300,
    hints: [
      { content: "Buka tab *Network* di Inspect Element sebelum kamu klik tombol 'Sinkronisasi Ulang'.", cost: 25 },
      { content: "Klik request ke endpoint APIs (contoh: `/api/labs/employees`). Lihat bagian *Response* JSON aslinya.", cost: 40 },
    ],
  },
  {
    title: 'Jejak Hantu',
    category: 'misc',
    difficulty: 'easy',
    description: `Tiap website punya semacam 'papan petunjuk' buat ngasih tau robot Google (crawler) mana jalan yang boleh dan gak boleh dimasukin.\n\nHacker paling suka ngecek papan ini buat nyari jalan-jalan tersembunyi.\n\n*Tugas*: Cari jalan masuk rahasia ke **Command Center Bunker** yang disembunyikan admin di sistem ini.`,
    flag: 'CTF{r0b0ts_txt_1s_n0t_4_s3cr3t}',
    points: 150,
    hints: [
      { content: "File papan petunjuk itu biasanya bernama `robots.txt` dan disimpan di root domain kamu.", cost: 15 },
    ],
  },
  {
    title: 'Pesan Alien',
    category: 'crypto',
    difficulty: 'easy',
    description: `Tim intel kita nangkap transmisi aneh dari server lawan. Awalnya kita kira ini password, tapi ternyata ini pesan bersandikan teks.\n\nCiphertext:\n\`Q1RGe2I0czY0XzNuYzBkaW5nXzFzX3QwMF9lYXN5X2JyMH0=\`\n\nTugas: Terjemahkan pesan ini biar kita tau rahasia mereka.`,
    flag: 'CTF{b4s64_3nc0ding_1s_t00_easy_br0}',
    points: 100,
    hints: [
      { content: "Teks yang ada tanda sama dengan (=) di bagian belakangnya itu biasanya identik dengan salah satu teknik *encoding* paling populer.", cost: 10 },
      { content: "Gunakan CyberChef (gchq.github.io/CyberChef/) dan pakai resep 'From Base64'.", cost: 20 },
    ],
  },
  // --- EXPERT LABS NEW ---
  {
    title: 'Pergeseran Julius',
    category: 'crypto',
    difficulty: 'easy',
    description: `Intel mendapatkan transmisi ini: \`PGI{p43f4e_p1cu3e_1f_g00_01q}\`\n\n*Lokasi Lab*: \`/labs/caesar-cipher\`\n\nKelihatan seperti ROTation cipher klasik (sandi Caesar). Pakai decoder di atas untuk mencari kunci yang pas (Shift ke berapa).`,
    flag: 'CTF{c43s4r_c1ph3r_1s_t00_01d}',
    points: 100,
    hints: [
      { content: "Format tulisan ini jelas harusnya CTF{...}. Dari huruf P ke C, itu mundur atau maju berapa langkah?", cost: 10 }
    ],
  },
  {
    title: 'Harta Karun Piksel',
    category: 'forensics',
    difficulty: 'medium',
    description: `Direktori penyimpanan AstaLabs menyimpan sebuah gambar. Tidak ada teks yang terlihat secara visual.\n\n*Lokasi Lab*: \`/labs/stegano-exif\`\n\nDownload gambar SVG tersebut lalu buka dengan Text Editor (Notepad/VSCode/View Source). Ada catatan tertinggal di sana.`,
    flag: 'CTF{st3g4n0_svg_m3t4d4t4_h1dd3n}',
    points: 200,
    hints: [
      { content: "File SVG sebenarnya memuat kode HTML/XML di belakang layar yang merender garis dan warna. Kamu bisa membacanya.", cost: 15 }
    ],
  },
  {
    title: 'Master Bypass',
    category: 'web',
    difficulty: 'hard',
    description: `Portal login khusus staff Bank Asta terbuka, tapi kita tidak punya kredensial.\n\n*Lokasi Lab*: \`/labs/sqli-login\`\n\nTugasmu masuk sebagai Admin. Jika sistem mengecek \`WHERE username='$user'\`, bisakah kita memaksa kondisi akhir dari query tersebut selalu bernilai 'TRUE'?`,
    flag: 'CTF{sq1_1nj3ct10n_byp4ss_succ3ss}',
    points: 350,
    hints: [
      { content: "Coba suntikkan input ini di kolom username: `admin' OR '1'='1`", cost: 40 }
    ],
  },
  {
    title: 'Eksekutor Bayangan',
    category: 'pwn',
    difficulty: 'hard',
    description: `Layanan 'Ping' ini mengeksekusi shell server asli. Jika dibiarkan berhadapan langsung dengan bash, kita bisa menumpang!\n\n*Lokasi Lab*: \`/labs/cmd-ping\`\n\nSisipkan \`cat flag.txt\` setelah alamat IP yang kamu ping.`,
    flag: 'CTF{c0mm4nd_1nj3ct10n_1s_l3th4l}',
    points: 400,
    hints: [
      { content: "Di shell linux, gabungkan eksekusi dengan titik koma. Contoh Payload: `127.0.0.1; cat flag.txt`", cost: 50 }
    ],
  },
  {
    title: 'Pengkhianat Internal',
    category: 'web',
    difficulty: 'insane',
    description: `Halaman ini memiliki fitur Proxy (Fetch) URL. Jika dia bisa *fetch* URL publik, apakah dia bisa disuruh *fetch* file konfigurasi rahasianya sendiri?\n\n*Lokasi Lab*: \`/labs/ssrf-fetch\`\n\nBaca file \`/app/secret-flag.txt\` dari skema \`file://\` internalnya.`,
    flag: 'CTF{ssrf_l0c4l_f1l3_r34d_3xpl01t3d}',
    points: 500,
    hints: [
      { content: "Internet memanggil protokol `http://` atau `https://`. Jika ingin merujuk letak file hard disk server, pakai protokol apa?", cost: 30 },
      { content: "Input: `file:///app/secret-flag.txt`", cost: 50 }
    ],
  },
];

// --- BOXGROUND: ASTACORP CHALLENGES (10 FLAGS) ---
const boxAstaCorpChallenges = [
  {
    title: 'Flag 1: Rekonaisans Direktori',
    category: 'box-astacorp',
    difficulty: 'easy',
    description: `Setiap operasi dimulai dengan Observasi.\\nPeriksa letak file standar yang sering digunakaan untuk memberikan peta jalan bagi robot mesin pencari.`,
    flag: 'CTF{4st4_c0rp_r0b0ts_h1dd3n_f1l3}',
    points: 100,
    hints: [
      { content: "Coba akses `robots.txt` pada url root AstaCorp box.", cost: 10 },
      { content: "URL: `/boxes/astacorp/robots.txt`.", cost: 20 },
    ],
  },
  {
    title: 'Flag 2: Pesan Tertinggal',
    category: 'box-astacorp',
    difficulty: 'easy',
    description: `Developer sering meninggalkan pesan catatan (comment) untuk diri mereka sendiri sebelum *production*.\\nCarilah pesan tersebut di halaman yang menjelaskan identitas AstaCorp.`,
    flag: 'CTF{0s1nt_c0mm3nt_l34k_v4l1d}',
    points: 100,
    hints: [
      { content: "Buka halaman 'About Us'.", cost: 10 },
      { content: "Klik kanan > View Page Source atau Ctrl+U. Cari tag komentar HTML `<!-- ... -->`.", cost: 20 },
    ],
  },
  {
    title: 'Flag 3: Kredensial Tumpah',
    category: 'box-astacorp',
    difficulty: 'medium',
    description: `Konfigurasi penting server terkadang tidak sengaja terekspos karena salah *routing*.\\nCoba temukan file Environment variables yang seharusnya tersembunyi.`,
    flag: 'CTF{d0t_3nv_f1l3_l34k3d_c0nf1g}',
    points: 200,
    hints: [
      { content: "File Environment variables di Linux Node.js biasanya bernama `.env`.", cost: 15 },
      { content: "Coba akses path `/boxes/astacorp/.env` secara langsung.", cost: 25 },
    ],
  },
  {
    title: 'Flag 4: Cookie Sang Raja',
    category: 'box-astacorp',
    difficulty: 'medium',
    description: `Halaman login AstaCorp meletakkan identitas role pengguna di Cookie secara terang-terangan.\\nNaikkan kasta-mu dengan memanipulasi *Cookie* menjadi tingkat Admin.`,
    flag: 'CTF{c00k13_t4mp3r1ng_4dm1n_r0l3}',
    points: 200,
    hints: [
      { content: "Buka halaman '/boxes/astacorp/login'.", cost: 10 },
      { content: "Buka Inspect Element > Tab *Application* atau *Storage* > Cookies. Ubah nilai 'role' dari 'guest' menjadi 'admin', lalu refresh halaman.", cost: 30 },
    ],
  },
  {
    title: 'Flag 5: SQL Injection Terminal',
    category: 'box-astacorp',
    difficulty: 'hard',
    description: `Meski kamu bisa merubah cookie admin, sistem backend sebenarnya masih menjaga pintu aslinya.\\nNamun, form login ini tidak melakukan *sanitasi* input username. Hancurkan logic database-nya!`,
    flag: 'CTF{sq1_1nj3ct10n_b0x_m0d3}',
    points: 300,
    hints: [
      { content: "Sistem menggunakan query: `SELECT * FROM users WHERE username='X'`. Kita perlu membuat nilai X itu menghasilkan kesimpulan logika yang selalu TRUE.", cost: 20 },
      { content: "Payload username SQL Injection klasik: `admin' OR '1'='1`.", cost: 40 },
    ],
  },
  {
    title: 'Flag 6: IDOR Profil Rahasia',
    category: 'box-astacorp',
    difficulty: 'hard',
    description: `AstaCorp memiliki API endpoint yang menampilkan data profil: '/boxes/astacorp/api/profile?id=2'.\\nID 2 adalah Guest. ID 1 adalah Employee. Siapakah ID 0?`,
    flag: 'CTF{1d0r_b4s1c_4dm1n_pr0f1l3}',
    points: 300,
    hints: [
      { content: "Insecure Direct Object Reference (IDOR) terjadi saat ID angka numerik tidak dikunci aksesnya. Coba saja ubah parameternya jadi `id=0`.", cost: 20 },
    ],
  },
  {
    title: 'Flag 7: Reflected XSS',
    category: 'box-astacorp',
    difficulty: 'medium',
    description: `Kolom pencarian di halaman utama AstaCorp memantulkan kembali *keyword* yang kamu masukkan tanpa filter keamanan.\\nBuktikan kerentanan ini dengan menyisipkan script tag.`,
    flag: 'CTF{xss_r3fl3ct3d_b0x_p4yl04d}',
    points: 250,
    hints: [
      { content: "Buka halaman awal Home `/boxes/astacorp/`.", cost: 10 },
      { content: "Di form pencarian, masukkan tag html. Contoh lengkap payload: `<script>alert(1)</script>`", cost: 30 },
    ],
  },
  {
    title: 'Flag 8: Mass Assignment (User Creation)',
    category: 'box-astacorp',
    difficulty: 'hard',
    description: `Endpoint API pendaftaran pengguna ini tidak menyaring variabel object JSON.\\nKirimkan request POST ke '/boxes/astacorp/api/users' dan paksa sistem membuatkan akun dengan level akses "admin".`,
    flag: 'CTF{m4ss_4ss1gnm3nt_4dm1n_cr34t3d}',
    points: 350,
    hints: [
      { content: "Gunakan command line `curl` atau aplikasi *Postman / Thunder Client*.", cost: 10 },
      { content: "Kirim data JSON di bagian HTTP body: `{\"username\":\"hacker\", \"role\":\"admin\"}`", cost: 40 },
    ],
  },
  {
    title: 'Flag 9: Blind SSRF Port Scan',
    category: 'box-astacorp',
    difficulty: 'insane',
    description: `Fitur Cache Proxy server sangat rakus. API '/boxes/astacorp/api/proxy' difungsikan untuk mengambil asset luaran dengan parameter '?url='.\\nManfaatkan ini untuk mengendus port administratif lokal di localhost!`,
    flag: 'CTF{ssrf_1nt3rn4l_p0rt_sc4nn1ng}',
    points: 400,
    hints: [
      { content: "Server-Side Request Forgery memaksa server target melakukan http request atas nama dirinya sendiri ke dalam.", cost: 30 },
      { content: "Masukkan parameter `?url=127.0.0.1`.", cost: 40 },
    ],
  },
  {
    title: 'Flag 10: RCE Ping Eksekutor (Root)',
    category: 'box-astacorp',
    difficulty: 'insane',
    description: `Finalisasi dominasimu atas mesin ini.\\nAPI layanan Ping jaringan '/boxes/astacorp/api/system-ping' mengeksekusi bash command di tingkat OS. Lempar payload injeksi perintah setelah IP dan baca 'flag.txt' di server.`,
    flag: 'CTF{rc3_sy5t3m_p1ng_r00t_0wn3d}',
    points: 500,
    hints: [
      { content: "Payload harus menggunakan karakter titik koma (;) atau OR (||).", cost: 30 },
      { content: "Gunakan payload parameter `?target=127.0.0.1; cat flag.txt`.", cost: 50 },
    ],
  },
];

const allChallenges = [...challenges, ...boxAstaCorpChallenges];

async function seed() {
  console.log('🌱 Lagi nyambungin ke MongoDB...');
  await mongoose.connect(MONGODB_URI);
  console.log('✅ Konek!');

  const { default: Challenge } = await import('../models/Challenge');

  await Challenge.deleteMany({});
  console.log('🗑️  Tantangan lama (dummy) udah diberantas.');

  for (const ch of allChallenges) {
    const { flag, ...rest } = ch;
    await Challenge.create({
      ...rest,
      flagHash: hashFlag(flag),
      isActive: true,
      solveCount: Math.floor(Math.random() * 20),
    });
    console.log(`  ✓ Berhasil deploy Real Lab: ${ch.title} (${ch.category})`);
  }

  console.log(`\n🎯 Sukses inisiasi ${allChallenges.length} Misi Nyata!`);
  console.log('\n--- KUNCI JAWABAN (FLAG) UNTUK ADMIN ---');
  allChallenges.forEach((c) => console.log(`[${c.category.toUpperCase()}] ${c.title}:\n${c.flag}\n`));
  console.log('-----------------------------------------');

  await mongoose.disconnect();
}

seed().catch((err) => {
  console.error('❌ Waduh, seeding gagal:', err);
  process.exit(1);
});
