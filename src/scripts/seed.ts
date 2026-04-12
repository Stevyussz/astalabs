// src/scripts/seed.ts
import mongoose from 'mongoose';
import { createHash } from 'crypto';
import * as dotenv from 'dotenv';

// Load env vars
dotenv.config({ path: '.env.local' });

const MONGODB_URI = process.env.MONGODB_URI ?? 'mongodb://localhost:27017/ctf-yusril';

function hashFlag(flag: string): string {
  return createHash('sha256').update(flag.trim()).digest('hex');
}

const challenges = [
  {
    title: 'Baby SQL',
    category: 'web',
    difficulty: 'easy',
    description: `Cari flag yang ngumpet di database. Form login-nya kayaknya rada... "bolong" deh.\n\nURL: http://challenge.ctf.local:8001\n\nBocoran Kecil: Apa yang terjadi kalau kamu masukin tanda kutip satu (') di kolom username?`,
    flag: 'CTF{sql_1nj3ct10n_f0r_th3_w1n}',
    points: 100,
    hints: [
      { content: "Coba masukin ' OR '1'='1 di kolom username-nya.", cost: 10 },
      { content: "Pake teknik UNION SELECT buat narik data dari tabel lain.", cost: 25 },
    ],
  },
  {
    title: 'Cookie Monster',
    category: 'web',
    difficulty: 'easy',
    description: `Panel admin-nya dikunci rapat, tapi masa iya cookie-nya nggak bisa diakalin?\n\nURL: http://challenge.ctf.local:8002\n\nPas kamu masuk sebagai "guest", coba deh intip cookie-nya pelan-pelan.`,
    flag: 'CTF{c00k13_m4n1pul4t10n_1s_sw33t}',
    points: 100,
    hints: [
      { content: 'Dekode nilai cookie-nya pake format base64.', cost: 10 },
    ],
  },
  {
    title: 'XSS Playground',
    category: 'web',
    difficulty: 'medium',
    description: `Ada celah Stored XSS di bagian komentar. Coba kamu akalin buat nyolong cookie admin-nya!\n\nURL: http://challenge.ctf.local:8003\n\nBot admin bakal mampir ke setiap komen baru dalam waktu 30 detik.`,
    flag: 'CTF{st0r3d_xss_g0t_4dm1n_c00k13}',
    points: 250,
    hints: [
      { content: 'Pake document.cookie terus kirim ke webhook kamu buat liat isinya.', cost: 20 },
    ],
  },
  {
    title: 'ROT-Apaan?',
    category: 'crypto',
    difficulty: 'easy',
    description: `Kita dapet pesan rahasia dari mata-mata: \`RGY{ebg_guvegrra_vf_n_pyNffvp}\`\n\nBisa kamu pecahin nggak artinya?`,
    flag: 'CTF{rot_thirteen_is_a_clAssic}',
    points: 50,
    hints: [
      { content: 'ROT13 itu sandi Caesar yang digeser 13 huruf ke depan.', cost: 5 },
    ],
  },
  {
    title: 'RSA Pemula',
    category: 'crypto',
    difficulty: 'medium',
    description: `Pesan RSA rahasia ini berhasil disadap. Katanya sih public key-nya punya faktor prima yang mini banget...\n\nN = 3233\ne = 17\nCiphertext: 2790\n\nFaktorkan N terus selamatin pesannya!`,
    flag: 'CTF{sm4ll_pr1m3s_4r3_d4ng3r0us}',
    points: 300,
    hints: [
      { content: 'N = 61 * 53. Pake Extended Euclidean buat nyari nilai d.', cost: 30 },
    ],
  },
  {
    title: 'Pesan Rahasia',
    category: 'crypto',
    difficulty: 'hard',
    description: `Pesan ini dienkripsi pake AES-CBC. Apesnya, nilai IV-nya dipake berkali-kali buat pesan yang beda. Bisa kamu bongkar?\n\nDownload file tantangannya di lampiran.`,
    flag: 'CTF{1v_r3us3_1s_4_k1ll4_att4ck}',
    points: 500,
    hints: [
      { content: 'Serangan CBC bit-flipping itu efektif banget kalo IV-nya bocor.', cost: 50 },
    ],
  },
  {
    title: 'Sembunyi di Keramaian',
    category: 'forensics',
    difficulty: 'easy',
    description: `Ada file PNG mencurigakan di PC tersangka. feeling gue sih ada yang disembunyiin di dalemnya!\n\nFile: suspicious.png\n\nTools: strings, exiftool, binwalk`,
    flag: 'CTF{st3g0_w1th_str1ngs_1s_3asy}',
    points: 75,
    hints: [
      { content: 'Coba tes dulu pake perintah "strings" ke file itu.', cost: 5 },
    ],
  },
  {
    title: 'Analisis PCAP',
    category: 'forensics',
    difficulty: 'medium',
    description: `Bedah file tangkapan jaringan ini. Kredensial-nya ditransfer polos banget (cleartext)! Cari sampe dapet!\n\nFile: traffic.pcap\n\nTips: Fokus ke request HTTP POST.`,
    flag: 'CTF{w1r3sh4rk_c4tch3s_4ll}',
    points: 200,
    hints: [
      { content: 'Filter Wireshark: http.request.method == "POST"', cost: 20 },
    ],
  },
  {
    title: 'Buffer Overflow Dasar',
    category: 'pwn',
    difficulty: 'medium',
    description: `Celah stack buffer overflow klasik. Timpa return address-nya biar lompat ke fungsi win().\n\nService: nc challenge.ctf.local 9001\n\nBinary: bof101`,
    flag: 'CTF{0v3rfl0w_th3_st4ck_g3t_sh3ll}',
    points: 350,
    hints: [
      { content: 'Pake pola cyclic buat nemuin titik offset-nya.', cost: 25 },
      { content: 'Fungsi win() ada di alamat offset 0x401196.', cost: 50 },
    ],
  },
  {
    title: 'Crackme Gampang',
    category: 'reverse',
    difficulty: 'easy',
    description: `Ada program kecil yang minta password. Bongkar (reverse) biar dapet flag-nya!\n\nBinary: crackme\n\nTools: strings, ltrace, Ghidra`,
    flag: 'CTF{r3v3rs3_3ng1n33r1ng_b4s1cs}',
    points: 150,
    hints: [
      { content: 'Coba "ltrace" buat intip library calls-nya.', cost: 15 },
    ],
  },
  {
    title: 'Sandi Emoji',
    category: 'misc',
    difficulty: 'easy',
    description: `Bisa baca ini nggak? 🏴 🔤 🔡 ✉️ 🔢 🔣 🔤 🔡 🔠 🏁\n\nSatu emoji mewakili satu karakter. Cari tau kuncinya!`,
    flag: 'CTF{em0j1_c0d3_cr4ck3d}',
    points: 75,
    hints: [
      { content: 'Coba cek nilai Unicode code points-nya.', cost: 10 },
    ],
  },
  {
    title: 'Python Jail',
    category: 'misc',
    difficulty: 'hard',
    description: `Kabur dari sandbox Python biar bisa baca /flag.txt\n\nService: nc challenge.ctf.local 9002\n\nLo bisa eksekusi kode Python, tapi banyak fungsi dasar yang udah diblokir.\n\n\`\`\`python\nallowed = {'print', 'len', 'range', 'int', 'str'}\n\`\`\``,
    flag: 'CTF{py7h0n_j41l_3sc4p3_m4st3r}',
    points: 600,
    hints: [
      { content: "Coba akses __class__.__mro__ buat nyari method objek sistem.", cost: 50 },
    ],
  },
];

async function seed() {
  console.log('🌱 Lagi nyambungin ke MongoDB...');
  await mongoose.connect(MONGODB_URI);
  console.log('✅ Konek!');

  const { default: Challenge } = await import('../models/Challenge');

  await Challenge.deleteMany({});
  console.log('🗑️  Tantangan lama udah dihapus.');

  for (const ch of challenges) {
    const { flag, ...rest } = ch;
    await Challenge.create({
      ...rest,
      flagHash: hashFlag(flag),
      isActive: true,
      solveCount: Math.floor(Math.random() * 50),
    });
    console.log(`  ✓ Berhasil dibuat: ${ch.title} (${ch.category}/${ch.difficulty})`);
  }

  console.log(`\n🎯 Berhasil nambahin ${challenges.length} tantangan!`);
  console.log('\nFlag (buat testing):');
  challenges.forEach((c) => console.log(`  ${c.title}: ${c.flag}`));

  await mongoose.disconnect();
}

seed().catch((err) => {
  console.error('❌ Waduh, seeding gagal:', err);
  process.exit(1);
});
