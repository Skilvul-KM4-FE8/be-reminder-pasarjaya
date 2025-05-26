const express = require("express");
const router = express.Router();
const { sendImage } = require("../controllers/mediaController");

router.post("/sendimage", sendImage);

module.exports = router;
