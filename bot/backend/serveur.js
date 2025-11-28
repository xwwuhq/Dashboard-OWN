const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const authRoutes = require("./routes/auth");
const statsRoutes = require("./routes/stats");
require("dotenv").config();

app.use(express.json());
app.use(cors());

app.use("/auth", authRoutes);
app.use("/stats", statsRoutes);

// Connexion MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("✅ MongoDB connecté"))
    .catch(err => console.log("❌ Erreur MongoDB :", err));

app.listen(process.env.PORT, () => {
    console.log(`🚀 Backend lancé sur le port ${process.env.PORT}`);
});