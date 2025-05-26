const { client } = require("../services/whatsappClient");

exports.sendMessage = async (req, res) => {
  const { number, message } = req.body;

  if (!number || !message) {
    return res.status(400).json({ error: "number and message are required" });
  }

  try {
    const chatId = number.replace(/\D/g, "") + "@c.us";
    await client.sendMessage(chatId, message);
    res.json({ success: true, to: number });
  } catch (err) {
    res.status(500).json({ success: false, error: err.toString() });
  }
};

exports.bulkSend = async (req, res) => {
  const { numbers, message } = req.body;

  if (!numbers || !message) {
    return res.status(400).json({ error: "numbers and message are required" });
  }

  const results = [];
  for (const number of numbers) {
    try {
      const chatId = number.replace(/\D/g, "") + "@c.us";
      await client.sendMessage(chatId, message);
      results.push({ number, status: "success" });
    } catch (err) {
      results.push({ number, status: "failed", error: err.toString() });
    }
  }

  res.json({ success: true, results });
};
