const { Client, LocalAuth } = require("whatsapp-web.js");
const { executablePath, args } = require("../config/puppeteerConfig");

let latestQr = null;
let isConnected = false;

const client = new Client({
  authStrategy: new LocalAuth(),
  puppeteer: {
    executablePath,
    headless: true,
    args,
  },
});

client.on("qr", (qr) => {
  latestQr = qr;
  isConnected = false;
  console.log("🟡 QR Code generated, scan it!");
});

client.on("ready", () => {
  console.log("✅ WhatsApp ready!");
  isConnected = true;
});

client.on("disconnected", () => {
  console.log("🔌 WhatsApp disconnected");
  isConnected = false;
});

module.exports = { client, getStatus: () => isConnected, getQr: () => latestQr };
