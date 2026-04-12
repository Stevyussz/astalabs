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
];

async function seed() {
  console.log('🌱 Lagi nyambungin ke MongoDB...');
  await mongoose.connect(MONGODB_URI);
  console.log('✅ Konek!');

  const { default: Challenge } = await import('../models/Challenge');

  await Challenge.deleteMany({});
  console.log('🗑️  Tantangan lama (dummy) udah diberantas.');

  for (const ch of challenges) {
    const { flag, ...rest } = ch;
    await Challenge.create({
      ...rest,
      flagHash: hashFlag(flag),
      isActive: true,
      solveCount: Math.floor(Math.random() * 20),
    });
    console.log(`  ✓ Berhasil deploy Real Lab: ${ch.title} (${ch.category})`);
  }

  console.log(`\n🎯 Sukses inisiasi ${challenges.length} Misi Nyata!`);
  console.log('\n--- KUNCI JAWABAN (FLAG) UNTUK ADMIN ---');
  challenges.forEach((c) => console.log(`[${c.category.toUpperCase()}] ${c.title}:\n${c.flag}\n`));
  console.log('-----------------------------------------');

  await mongoose.disconnect();
}

seed().catch((err) => {
  console.error('❌ Waduh, seeding gagal:', err);
  process.exit(1);
});
