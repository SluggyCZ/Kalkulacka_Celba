const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 3000;

const dataFilePath = path.join(__dirname, 'data.json');

app.get('/api/button-clicks', (req, res) => {
    let data = {};
    if (fs.existsSync(dataFilePath)) {
        data = JSON.parse(fs.readFileSync(dataFilePath, 'utf-8'));
    }
    res.json(data);
});

// Middleware pro parsování JSON dat
app.use(express.json());

// Statická složka
app.use(express.static(path.join(__dirname, 'Kalkulacka')));

// Endpoint pro zpracování tlačítek
app.post('/api/button-click', (req, res) => {
    const button = req.body.button;

    // Načtení dat ze souboru
    let data = {};
    if (fs.existsSync(dataFilePath)) {
        data = JSON.parse(fs.readFileSync(dataFilePath, 'utf-8'));
    }

    // Aktualizace počtu stisknutí tlačítka
    if (data[button]) {
        data[button]++;
    } else {
        data[button] = 1;
    }

    // Uložení do souboru
    fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2));

    res.json({ message: 'Počet stisknutí tlačítek byl aktualizován', data });
});

// Spuštění serveru
app.listen(PORT, () => {
    console.log(`Server běží na http://localhost:${PORT}`);
});