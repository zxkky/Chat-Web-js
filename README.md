# 💬 Chat-Web-js

Aplikasi **chat real-time berbasis web** menggunakan **Node.js**, **Express**, dan **Socket.io**.  
Proyek ini mendukung **pesan teks** dan **pengiriman audio (voice message)** secara langsung antar pengguna.

---

## 🚀 Fitur

- 💬 Chat real-time antar pengguna menggunakan Socket.io  
- 🎙️ Upload dan kirim pesan suara (audio)  
- 👥 Notifikasi saat pengguna bergabung atau keluar  
- 🧭 Interface web sederhana dan responsif  
- ⚙️ File upload tersimpan otomatis di folder `/public/uploads`

---

## 🧩 Teknologi yang Digunakan

| Teknologi | Fungsi |
|------------|--------|
| [Node.js](https://nodejs.org/) | Server runtime |
| [Express.js](https://expressjs.com/) | Framework backend |
| [Socket.io](https://socket.io/) | Komunikasi real-time antara client dan server |
| [Multer](https://github.com/expressjs/multer) | Middleware upload file audio |
| [EJS](https://ejs.co/) | Template engine untuk tampilan web |
| [HTML5 + JS](https://developer.mozilla.org/en-US/docs/Web/HTML) | Tampilan dan interaksi pengguna |

---

## ⚙️ Cara Instalasi

### 1. Clone Repository
```bash
git clone https://github.com/zxkky/Chat-Web-js.git
cd Chat-Web-js
```
### 2. Install Dependencies
```
npm install
```
### 3. Jalankan Server
```
node server.js
```
Server akan berjalan di:
```
➡️ http://localhost:3000
```
## 🔧 API & Endpoint

| Endpoint           | Method | Deskripsi                          |
|--------------------|---------|------------------------------------|
| `/`                | GET     | Halaman utama chat                 |
| `/upload`          | POST    | Upload file audio ke server        |
| `/public/uploads`  | Static  | Folder untuk menyimpan file audio  |

## ⚡ Event Socket.io

| Event          | Arah              | Deskripsi                                 |
|----------------|-------------------|-------------------------------------------|
| `user joined`  | Client → Server   | Mengirim notifikasi saat user masuk       |
| `chat message` | Client ↔ Server   | Mengirim dan menerima pesan teks          |
| `chat audio`   | Server → Client   | Mengirim pesan audio ke semua user        |
| `user left`    | Server → Client   | Notifikasi ketika user keluar             |

## 🗂️ Struktur Folder
```
Chat-Web-js/
│
├── public/             # File statis (CSS, JS, uploads)
│   └── uploads/        # Folder hasil upload audio
│
├── views/              # File EJS untuk tampilan
│
├── server.js           # Server utama (Express + Socket.io)
├── package.json        # Dependencies proyek
└── README.md           # Dokumentasi ini
```
## 💡 Catatan

Pastikan folder `public/uploads/` sudah ada sebelum menjalankan server.  
Jika belum ada, jalankan perintah berikut di terminal:

```
mkdir -p public/uploads
echo "✅ Folder 'public/uploads' berhasil dibuat (jika belum ada)."
```
### 👨‍💻 Kontributor

Dibuat oleh zxkky
