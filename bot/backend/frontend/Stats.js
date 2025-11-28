const mongoose = require("mongoose");

const statsSchema = new mongoose.Schema({
    guildId: String,
    members: Number,
    messages: Number,
    date: Date
});

module.exports = mongoose.model("Stats", statsSchema);