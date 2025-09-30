// server.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

let clients = [];

// SSE-Endpunkt für Overlay
app.get('/events', (req, res) => {
    res.set({
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive'
    });
    res.flushHeaders();

    clients.push(res);

    req.on('close', () => {
        clients = clients.filter(c => c !== res);
    });
});

// EventSub Webhook von Twitch
app.post('/webhook', (req, res) => {
    const event = req.body; // z. B. Subscriber, Follow, Bits
    console.log('Event empfangen:', event);

    // Sende Event an alle verbundenen Overlay-Clients
    clients.forEach(client => {
        client.write(`data: ${JSON.stringify({user: event.user, type: event.type})}\n\n`);
    });

    res.status(200).send('ok');
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server läuft auf http://localhost:${PORT}`);
});