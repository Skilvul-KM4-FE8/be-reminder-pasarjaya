const express = require("express");
const router = express.Router();
const { sendMessage, bulkSend } = require("../controllers/messageController");

router.post("/send", sendMessage);
router.post("/bulksend", bulkSend);

module.exports = router;
