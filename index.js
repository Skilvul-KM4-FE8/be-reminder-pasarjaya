const express = require("express");
const cors = require("cors");
const { Client, LocalAuth } = require("whatsapp-web.js");
const qrcode = require("qrcode-terminal");

const app = express();
const port = 4567;

app.use(cors());
app.use(express.json());

// Inisialisasi client WhatsApp
const client = new Client({
  authStrategy: new LocalAuth(),
  puppeteer: {
    headless: true,
    args: ["--no-sandbox"],
  },
});

// Tampilkan QR code di terminal
let latestQr = null;

client.on("qr", (qr) => {
  latestQr = qr;
  console.log("Scan QR Code ini dengan WhatsApp:");
  qrcode.generate(qr, { small: true });
});

// Endpoint untuk mendapatkan QR code di frontend
app.get("/qr", (req, res) => {
  if (latestQr) {
    res.json({ qr: latestQr });
  } else {
    res.status(404).json({ error: "QR code belum tersedia" });
  }
});

// Event saat client siap
client.on("ready", async () => {
  console.log("✅ WhatsApp siap digunakan!");
  try {
    // Tunggu 3 detik untuk stabilisasi session dan page
    await new Promise((r) => setTimeout(r, 5000));

    const contacts = await client.getContacts();
    console.log("📇 Daftar kontak:");
    contacts.forEach((contact) => {
      console.log(`- ${contact.name || contact.pushname || contact.number} | ${contact.id._serialized}`);
    });
  } catch (err) {
    console.error("❌ Gagal mengambil kontak:", err);
  }
});

// Event saat ada pesan masuk (opsional)
client.on("message", async (msg) => {
  console.log(`📥 Message from ${msg.from}: ${msg.body}`);
});

// Start WhatsApp client
client.initialize();

// Endpoint API untuk kirim pesan
app.post("/send", async (req, res) => {
  const { number, message } = req.body;

  if (!number || !message) {
    return res.status(400).json({ error: "number and message are required" });
  }

  try {
    // Pastikan nomor hanya angka, hapus karakter lain
    const chatId = number.replace(/\D/g, "") + "@c.us";
    await client.sendMessage(chatId, message);
    res.json({ success: true, to: number });
  } catch (err) {
    console.error("❌ Gagal kirim pesan:", err);
    res.status(500).json({ success: false, error: err.toString() });
  }
});

// Mulai server
app.listen(port, () => {
  console.log(`🚀 Server berjalan di http://localhost:${port}`);
});
