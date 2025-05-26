const { client } = require("../services/whatsappClient");
const { MessageMedia } = require("whatsapp-web.js");

exports.sendImage = async (req, res) => {
  const { number, image, caption } = req.body;

  if (!number || !image) {
    return res.status(400).json({ error: "number and image are required" });
  }

  try {
    const chatId = number.replace(/\D/g, "") + "@c.us";
    const media = new MessageMedia("image/jpeg", image); // base64 format
    await client.sendMessage(chatId, media, { caption });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, error: err.toString() });
  }
};
