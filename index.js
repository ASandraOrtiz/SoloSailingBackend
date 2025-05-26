//index.js
require("dotenv").config();
const express = require("express");
const mongoose = require("./db");
const http = require("http");
const { setupWebSocket } = require("./services/websocket");


const userRoutes = require("./routes/userRoutes");
const obstacleRoutes = require("./routes/obstacleRoutes");
const gpsRoutes = require("./routes/gpsRoutes");
const profileRoutes = require("./routes/profileRoutes");
const regattaRoutes = require("./routes/regattaRoutes");
const simulationRoutes = require("./routes/simulationRoutes");
const boatRoutes       = require("./routes/boatRoutes");

const app = express();
const server = http.createServer(app);

app.get("/", (req, res) => {
    res.send("Hello world! This is the backend of SoloSailing.");
});
  
app.use(express.json());
app.use("/api/users", userRoutes);
app.use("/api/profiles", profileRoutes);
app.use("/api/obstacles", obstacleRoutes);
app.use("/api", gpsRoutes);
app.use("/api/regattas", regattaRoutes);
app.use("/api/regattas/:regattaId", simulationRoutes);
app.use("/api/regattas/:regattaId/boats", boatRoutes);

setupWebSocket(server);

process.on("uncaughtException", (err) => {
    console.error("Uncaught Exception:", err);
});

process.on("unhandledRejection", (reason, promise) => {
    console.error("Unhandled Rejection at:", promise, "reason:", reason);
});

const PORT = process.env.PORT;
server.listen(PORT, "0.0.0.0", () => {
    console.log(`Servidor corriendo en ${PORT}`);
});

