const express = require("express");
const router = express.Router();
const { getStatus, getQr, logout } = require("../controllers/statusController");

router.get("/qr", getQr);
router.get("/", getStatus);
router.post("/logout", logout);

module.exports = router;
