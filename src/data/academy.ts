export type Chapter = {
  id: string;
  title: string;
  content: string; // Basic HTML/Markdown string for simplicity in implementation
  labUrl?: string; // If this chapter has a lab, put the URL here (e.g. /labs/mata-batin)
  labInstruction?: string;
};

export type Course = {
  id: string;
  title: string;
  description: string;
  chapters: Chapter[];
};

export const COURSES: Course[] = [
  {
    id: 'web-101',
    title: 'Web Security 101',
    description: 'Pahami pondasi keamanan web. Mulai dari inspek kode sumber, hingga eksploitasi API sederhana.',
    chapters: [
      {
        id: '1',
        title: 'Bab 1: Pengenalan Arsitektur Web',
        content: `
          <p>Halo operative! Selamat datang di kelas Web Security 101. Sebelum kita mulai meretas, kita harus paham dulu medan perang kita.</p>
          <br/>
          <h2 style="font-size:20px; font-weight:700; color:#e2e8f0; margin-bottom:8px">Bagaimana Web Bekerja?</h2>
          <p>Website modern bekerja dengan konsep Client-Server. Browser kamu (Client) meminta data ke Server. Server kemudian mengirim file berupa HTML (kerangka), CSS (desain), dan JavaScript (otak interaktif).</p>
          <p>Nah, di mana titik kelemahannya?</p>
          <ul style="list-style-type:disc; padding-left:20px; line-height:1.8">
            <li><strong>Sisi Client (Frontend)</strong>: Karena dikirim langsung ke PC kamu, kamu punya kontrol penuh! Kamu bisa melihat kodenya, merubahnya, bahkan memalsukannya.</li>
            <li><strong>Jalur Komunikasi</strong>: Data yang dikirim dan diterima bisa dicegat (Intercept) dan dimodifikasi di tengah jalan.</li>
            <li><strong>Sisi Server (Backend)</strong>: Kalau server percaya begitu saja sama data yang dikirim Client tanpa validasi kuat, *BOOM*, eksploitasi terjadi!</li>
          </ul>
          <br/>
          <p>Di bab berikutnya, kita akan membahas kesalahan paling basic tapi sering terjadi di Frontend. Bersiaplah!</p>
        `
      },
      {
        id: '2',
        title: 'Bab 2: Mengintip Rahasia (View Source)',
        content: `
          <p>Hal pertama yang harus dikuasai oleh hacker adalah keahlian mengobservasi. Tidak ada hal yang gaib di web, semuanya bisa dibaca jika dikirimkan ke browser.</p>
          <br/>
          <h2 style="font-size:20px; font-weight:700; color:#e2e8f0; margin-bottom:8px">Inspect Element & Source Code Disclosure</h2>
          <p>Developer sering meninggalakan "catatan" untuk diri mereka sendiri saat membangun web. Ironisnya, mereka kadang lupa menghapusnya dan masuk ke level produksi (*live*).</p>
          <div style="padding:16px; background:rgba(0,0,0,0.3); border:1px solid rgba(255,255,255,0.05); font-family:monospace; color:#a8c7fa; border-radius:8px; margin: 16px 0">
            <span style="color:#8b949e">&lt;!-- TODO: Ganti password root DB "rahasia123" sebelum rilis! --&gt;</span>
          </div>
          <p>Kalau kamu menekan <kbd style="background:#333; padding:2px 6px; border-radius:4px; font-family:monospace">Ctrl + U</kbd> atau Klik Kanan &gt; <strong>Inspect</strong>, kamu bisa menemukan harta karun semacam ini!</p>
        `,
        labUrl: '/labs/mata-batin',
        labInstruction: 'Di panel Terminal sebelah kanan, sebuah sistem login sedang dicegat. Developer sedang *under maintenance*. Coba cari tahu apakah dia meninggalkan catatan yang ceroboh menggunakan mode Inspect Element / Developer Tools.',
      },
      {
        id: '3',
        title: 'Bab 3: Manipulasi Identitas (Cookies)',
        content: `
          <p>Web bersifat *stateless* (pelupa). Pas kamu login, sistem memberitahu browsermu: "Pegang kartu ID ini (bernama Cookie/JWT), nanti kalau mau akses cukup tunjukin kartunya."</p>
          <br/>
          <h2 style="font-size:20px; font-weight:700; color:#e2e8f0; margin-bottom:8px">Masalah dengan Cookie Statis</h2>
          <p>Kalau "kartu" (cookie) yang dikasih ke kita cuma berisi teks biasa yang gampang ditebak, kita bisa meretas identitas orang lain!</p>
          <p>Misalnya, server ngasih cookie <code>role=user</code>. Apa jadinya kalau kita ganti pakai tangan jadi <code>role=admin</code> di browser kita (lewat Inspect Element &gt; <strong>Application / Storage / Cookies</strong>)?</p>
          <br/>
          <p>Seringkali developer membungkusnya sedikit agar terlihat keren, misal pakai teknik kode acak sederhana seperti Base64.</p>
          <p>Contoh Base64 dari nama <code>adi</code> adalah <code>YWRp</code>. Kamu bisa menggunakan <em>CyberChef (gchq.github.io/CyberChef/)</em> untuk mengubahnya ke pola lain.</p>
        `,
        labUrl: '/labs/biskuit-admin',
        labInstruction: 'Dashboard Admin ini membedakan kamu berdasarkan Cookies yang tersimpan di browsermu. Karena kamu belum terotentikasi, kamu diberi cookie "guest" dalam format sandi rahasia Base64. Tugasmu: Ubah sandi itu menjadi status "admin", simpan cookienya, dan refresh halamannya!',
      },
      {
        id: '4',
        title: 'Bab 4: Data Tumpah (API Leakage)',
        content: `
          <p>Aplikasi web modern (seperti yang berlapis React/Next.js) tidak me-render seluruh tampilan dari server seperti zaman batu. Mereka meminta "data mentah" dari API server, lalu UI memfilter datanya.</p>
          <br/>
          <h2 style="font-size:20px; font-weight:700; color:#e2e8f0; margin-bottom:8px">Excessive Data Exposure</h2>
          <p>Bayangkan API ditugaskan menarik data profil karyawan berupa: Nama, Jabatan, dan Email. Sang developer mengambil data profil karyawan tersebut langsung dari Database secara mentah tanpa filter.</p>
          <p><strong>Apesnya</strong>, Database tidak hanya berisi nama karyawan, tapi juga password dan informasi sensitif lain! UI/Tampilan web memang hanya memfilter *Nama dan Email* saja yang terlihat di layar. </p>
          <br/>
          <p>Bisakah hacker melihatnya? <strong>Tentu bisa.</strong></p>
          <p>Dengan membuka <strong>Inspect &gt; Network Tab</strong> ketika sebuah website dimuat, hacker bisa melihat aliran data asli API-nya yang tumpah, walaupun data itu disembunyikan rapi oleh UI web-nya.</p>
        `,
        labUrl: '/labs/bocor-halus',
        labInstruction: 'Di Lab ini terdapat direktori karyawan. Di layarmu nampaknya normal-normal saja, hanya sebatas Nama dan Jabatan. Buka Inspect Element, pergi ke tab **Network**, dan klik tombol "Sinkronisasi Ulang". Carilah file JSON yang tumpah dan baca informasi sensitifnya!',
      },
      {
        id: '5',
        title: 'Bab 5: Papan Petunjuk (Robots.txt)',
        content: `
          <p>Kebutuhan SEO seringkali memaksa developer untuk menuntun robot search engine (seperti Googlebot) agar hanya mengindeks halaman tertentu saja.</p>
          <br/>
          <h2 style="font-size:20px; font-weight:700; color:#e2e8f0; margin-bottom:8px">Information Disclosure via robots.txt</h2>
          <p>File <code>robots.txt</code> adalah file publik. Masalahnya, developer sering menuliskan direktori "rahasia" atau "admin" di sana dengan instruksi <code>Disallow</code> (jangan diintip).</p>
          <p>Bagi robot, itu larangan. Tapi bagi hacker, itu adalah <strong>daftar peta harta karun</strong> yang memberitahu di mana letak halaman-halaman sensitif disimpan.</p>
          <br />
          <p>Selalu cek <code>/robots.txt</code> di setiap targetmu!</p>
        `,
        labUrl: '/labs/robots.txt',
        labInstruction: 'Sistem Bunker Rahasia AstaLabs sedang disembunyikan dari publik. Coba akses file peta petunjuk robot sistem ini (robots.txt) dan temukan di mana admin menyembunyikan "Secret Bunker" mereka!',
      },
      {
        id: '6',
        title: 'Bab 6: Sandi Alien (Encoding)',
        content: `
          <p>Encoding bukan enkripsi. Encoding hanyalah cara untuk merubah format data agar bisa dikirim dengan aman di internet (misal: mengirim gambar/binari lewat teks).</p>
          <br/>
          <h2 style="font-size:20px; font-weight:700; color:#e2e8f0; margin-bottom:8px">Base64 Encoding</h2>
          <p>Base64 adalah salah satu standar encoding paling umum. Ciri khasnya adalah penggunaan karakter A-Z, a-z, 0-9, serta karakter khusus '+' dan '/'.</p>
          <p>Jika sebuah pesan diakhiri dengan satu atau dua tanda sama dengan (<code>=</code>), hampir pasti itu adalah Base64 (tanda itu disebut *padding*).</p>
          <br />
          <p>Hacking seringkali melibatkan proses mengubah balik (Decoding) pesan-pesan ini untuk melihat data aslinya.</p>
        `,
        labUrl: '/labs/pesan-alien',
        labInstruction: 'Kita menangkap sinyal transmisi alien. Signal ini nampak seperti encoded text. Gunakan instingmu, perhatikan pola karakternya, dan terjemahkan pesan tersebut untuk mendapatkan flag!',
      }
    ]
  }
];

export function getCourseById(id: string): Course | null {
  return COURSES.find(c => c.id === id) || null;
}
