// webhook-server.js
const express = require("express");
const axios = require("axios");
const app = express();
app.use(express.json());

const TELEGRAM_BOT_TOKEN = '8005110875:AAGLwacsKsBuj24NnhNb9s9JCOi-aDkJyQM';
const CHAT_ID = '7561023594';

app.post("/webhook", async (req, res) => {
  const signal = req.body;

  console.log("✅ Webhook Sinyali Alındı:", signal);

  const message = `
${signal.type === 'long' ? '📈 [LONG SİNYALİ]' : '📉 [SHORT SİNYALİ]'}
Coin: ${signal.symbol}
Fiyat: ${signal.price}
Zaman: ${signal.time}
  `.trim();

  try {
    await axios.post(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
      chat_id: CHAT_ID,
      text: message,
    });
    console.log("📬 Telegram mesajı başarıyla gönderildi!");
  } catch (err) {
    console.error("❌ Telegram mesajı hatası:", err.response?.data || err.message);
  }

  res.status(200).send("OK");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 Webhook sunucusu ${PORT} portunda çalışıyor.`);
});
