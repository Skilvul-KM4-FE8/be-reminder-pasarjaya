const express = require("express");
const cors = require("cors");

const messageRoutes = require("./routes/messageRoutes");
const statusRoutes = require("./routes/statusRoutes");
const mediaRoutes = require("./routes/mediaRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/message", messageRoutes);
app.use("/api/status", statusRoutes);
app.use("/api/media", mediaRoutes);

module.exports = app;
