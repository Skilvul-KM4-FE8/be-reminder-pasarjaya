const express = require("express");
const cors = require("cors");
const { Client, LocalAuth } = require("whatsapp-web.js");
// const qrcode = require("qrcode-terminal");
// const { executablePath } = require("puppeteer");

const app = express();
const port = 4567;

app.use(cors());
app.use(express.json());

// Inisialisasi client WhatsApp
const client = new Client({
  authStrategy: new LocalAuth(),
  puppeteer: {
    executablePath: process.env.PUPPETEER_EXECUTABLE_PATH || "/usr/bin/chromium",
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  },
});

let latestQr = null;
let isConnected = false; // ✅ Status koneksi WA

// generate QR code saat client belum terhubung
// client.on("qr", (qr) => {
//   latestQr = qr;
//   isConnected = false; // QR muncul = belum konek
//   console.log("Scan QR Code ini dengan WhatsApp:");
//   qrcode.generate(qr, { small: true });
// });

client.on("ready", async () => {
  console.log("✅ WhatsApp siap digunakan!");
  isConnected = true; // ✅ Sudah terhubung
  // try {
  //   await new Promise((r) => setTimeout(r, 5000));
  //   const contacts = await client.getContacts();
  //   console.log("📇 Daftar kontak:");
  //   contacts.forEach((contact) => {
  //     console.log(`- ${contact.name || contact.pushname || contact.number} | ${contact.id._serialized}`);
  //   });
  // } catch (err) {
  //   console.error("❌ Gagal mengambil kontak:", err);
  // }
});

client.on("disconnected", () => {
  console.log("🔌 WhatsApp terputus");
  isConnected = false; // ❌ Putus koneksi
});

// Endpoint QR code
app.get("/qr", (req, res) => {
  if (latestQr) {
    res.json({ qr: latestQr });
  } else {
    res.status(404).json({ error: "QR code belum tersedia" });
  }
});

// ✅ Endpoint status koneksi
app.get("/status", (req, res) => {
  res.json({ connected: isConnected });
});

// Endpoint untuk logout WhatsApp
app.post("/logout", async (req, res) => {
  try {
    await client.logout();
    isConnected = false;
    console.log("Logged out");

    // Re-initialize client to generate a new QR code
    client.destroy();

    setTimeout(() => {
      client.initialize(); // This will trigger QR generation
    }, 1000); // slight delay to avoid race condition

    res.json({ success: true });
  } catch (error) {
    console.error("Logout failed", error);
    res.json({ success: false });
  }
});

// Endpoint kirim pesan
app.post("/send", async (req, res) => {
  const { number, message } = req.body;

  if (!number || !message) {
    return res.status(400).json({ error: "number and message are required" });
  }

  try {
    const chatId = number.replace(/\D/g, "") + "@c.us";
    await client.sendMessage(chatId, message);
    res.json({ success: true, to: number });
    console.log(`✅ Pesan terkirim ke ${number}: ${message}`);
  } catch (err) {
    console.error("❌ Gagal kirim pesan:", err);
    res.status(500).json({ success: false, error: err.toString() });
  }
});

// Jalankan server
app.listen(port, () => {
  console.log(`🚀 Server berjalan di http://localhost:${port}`);
});

// Inisialisasi client
client.initialize();
