// index.js
const { Client, GatewayIntentBits } = require('discord.js');
require('dotenv').config(); // pour charger le TOKEN depuis le .env

// Crée le client Discord
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds, // nécessaire pour se connecter aux serveurs
    ],
});

// Quand le bot est prêt
client.once('ready', () => {
    console.log(`${client.user.tag} est connecté et prêt !`);
});

// Connexion du bot
client.login(process.env.BOT_TOKEN);