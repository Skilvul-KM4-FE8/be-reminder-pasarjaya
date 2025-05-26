# 📬 WhatsApp Gateway API

Sebuah gateway WhatsApp berbasis `Node.js` dan `whatsapp-web.js` yang memungkinkan pengiriman pesan, file, gambar, dan manajemen sesi secara fleksibel melalui REST API.

---

## 🚀 Fitur Utama

- ✅ Scan QR Code untuk login WhatsApp Web
- ✅ Cek status koneksi WhatsApp
- ✅ Kirim pesan teks
- ✅ Kirim gambar dan file
- ✅ Kirim pesan massal (bulk message)
- ✅ Logout session WA
- ✅ Terstruktur modular dan scalable

---

## 📁 Struktur Folder

```bash
.
├── app.js                     # Entry point
├── config/
│   └── puppeteerConfig.js     # Konfigurasi puppeteer (headless browser)
├── controllers/
│   ├── messageController.js   # Logic pengiriman pesan
│   ├── fileController.js      # Logic kirim file/gambar
│   └── authController.js      # Login, logout, status
├── routes/
│   ├── messageRoutes.js       # Routing /send, /sendimage, /sendfile
│   ├── authRoutes.js          # Routing /qr, /logout, /status
│   └── bulkRoutes.js          # Routing /bulksend
├── services/
│   └── whatsappClient.js      # Inisialisasi dan handler client WhatsApp
├── utils/
│   └── formatter.js           # Helper-formatting nomor WA, dsb
└── README.md                  # Dokumentasi proyek
```

---

## 🛠️ Instalasi

### 1. Clone Repository

```bash
git clone https://github.com/namamu/whatsapp-gateway-api.git
cd whatsapp-gateway-api
```

### 2. Install Dependencies

```bash
npm install
```

### 3. (Opsional) Konfigurasi Chromium

Jika menggunakan Chromium sistem, ubah `executablePath` pada `config/puppeteerConfig.js`.
Jika tidak, Puppeteer akan otomatis mendownload Chromium-nya sendiri.

---

## ▶️ Menjalankan Server

```bash
npm run dev
```

Server akan berjalan di: [http://localhost:4567](http://localhost:4567)

---

## 🔐 Autentikasi WhatsApp

1. Jalankan server.
2. Buka endpoint: `GET /qr`
3. Scan QR Code menggunakan aplikasi WhatsApp Anda.
4. Status akan berubah menjadi `connected: true` di endpoint `GET /status`.

---

## 📮 Endpoint API

### 🔹 Cek Status

```bash
GET /status
```

### 🔹 QR Code

```bash
GET /qr
```

### 🔹 Logout WA

```bash
POST /logout
```

---

### ✉️ Kirim Pesan

```bash
POST /send
Content-Type: application/json
Body:
{
  "number": "628xxxxxx",
  "message": "Halo dunia!"
}
```

### 🖼️ Kirim Gambar

```bash
POST /sendimage
Content-Type: application/json
Body:
{
  "number": "628xxxxxx",
  "image": "data:image/jpeg;base64,...",
  "caption": "Ini gambar"
}
```

### 📎 Kirim File

```bash
POST /sendfile
Content-Type: application/json
Body:
{
  "number": "628xxxxxx",
  "file": "data:application/pdf;base64,...",
  "caption": "Ini file"
}
```

### 📢 Kirim Pesan Massal

```bash
POST /bulksend
Content-Type: application/json
Body:
{
  "numbers": ["628xxx", "628yyy"],
  "message": "Halo semuanya!"
}
```

---

## ⚠️ Catatan

- Format nomor harus menggunakan kode negara tanpa tanda `+`, contoh: `62812345678`.
- Gunakan format `base64` saat mengirim file/gambar.
- Gunakan Puppeteer Chromium bawaan jika belum menginstal Chromium secara manual.

---

## 💻 Teknologi yang Digunakan

- [Node.js](https://nodejs.org/)
- [Express.js](https://expressjs.com/)
- [whatsapp-web.js](https://wwebjs.dev/)
- [Puppeteer](https://pptr.dev/)

---

## 🧑‍💻 Author

**Muhamad Alfito Santosa**
GitHub: [@alfitosansantosa](https://github.com/alfitosantosa)

---

## 📃 License

MIT License
