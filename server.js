const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

// Nastavení statické složky na `Kalkulacka`
app.use(express.static(path.join(__dirname, 'Kalkulacka')));

// Hlavní stránka
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'Kalkulacka', 'index.html'));
});

// Spuštění serveru
app.listen(PORT, () => {
    console.log(`Server běží na http://localhost:${PORT}`);
});