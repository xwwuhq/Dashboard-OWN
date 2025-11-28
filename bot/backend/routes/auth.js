
const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/User");

// Login
router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.json({ error: "Utilisateur introuvable" });

    const ok = await bcrypt.compare(password, user.password);
    if (!ok) return res.json({ error: "Mot de passe incorrect" });

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
        expiresIn: "30d"
    });

    return res.json({ token });
});

// Création compte staff (OWNER uniquement)
router.post("/create", async (req, res) => {
    const { email, password, role, ownerKey } = req.body;

    if (ownerKey !== process.env.OWNER_KEY)
        return res.json({ error: "Clé propriétaire invalide" });

    const hashed = await bcrypt.hash(password, 10);

    await User.create({
        email,
        password: hashed,
        role
    });

    return res.json({ success: "Compte staff créé !" });
});

module.exports = router;