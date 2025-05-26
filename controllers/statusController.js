const { getStatus, getQr, client } = require("../services/whatsappClient");

exports.getStatus = (req, res) => {
  res.json({ connected: getStatus() });
};

exports.getQr = (req, res) => {
  const qr = getQr();
  if (qr) {
    res.json({ qr });
  } else {
    res.status(404).json({ error: "QR code belum tersedia" });
  }
};

exports.logout = async (req, res) => {
  try {
    await client.logout();
    await client.destroy();

    setTimeout(() => {
      client.initialize();
    }, 5000);

    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, error: err.toString() });
  }
};
