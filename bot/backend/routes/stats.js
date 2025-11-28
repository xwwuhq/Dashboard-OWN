const express = require("express");
const router = express.Router();
const Stats = require("../models/Stats");

router.post("/push", async (req, res) => {
    const { guildId, members, messages } = req.body;

    await Stats.create({
        guildId,
        members,
        messages,
        date: Date.now()
    });

    return res.json({ success: true });
});

router.get("/latest", async (req, res) => {
    const data = await Stats.find().sort({ date: -1 }).limit(1);
    return res.json(data[0] || {});
});

module.exports = router;