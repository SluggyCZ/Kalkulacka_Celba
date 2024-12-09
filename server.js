const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 3000;

// Nastavení statické složky na `Kalkulacka`
app.use(express.static(path.join(__dirname, 'Kalkulacka')));
app.use(express.json());

// Cesta k souboru `data.json`
const dataFilePath = path.join(__dirname, 'data.json');

// Načtení existujících dat nebo vytvoření prázdného objektu
let buttonPressCounts = {};
if (fs.existsSync(dataFilePath)) {
    buttonPressCounts = JSON.parse(fs.readFileSync(dataFilePath, 'utf-8'));
}

// Uložení dat do souboru
const saveDataToFile = () => {
    fs.writeFileSync(dataFilePath, JSON.stringify(buttonPressCounts, null, 2), 'utf-8');
};

// Endpoint pro zaznamenání stisknutí tlačítka
app.post('/api/button-press', (req, res) => {
    const { buttonValue } = req.body;

    // Zvýšení počtu stisknutí pro tlačítko
    buttonPressCounts[buttonValue] = (buttonPressCounts[buttonValue] || 0) + 1;

    // Uložení dat do souboru
    saveDataToFile();

    res.status(200).send({ message: `Tlačítko "${buttonValue}" bylo zaznamenáno.`, data: buttonPressCounts });
});

// Endpoint pro získání statistik
app.get('/api/stats', (req, res) => {
    res.status(200).send(buttonPressCounts);
});

// Hlavní stránka
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'Kalkulacka', 'index.html'));
});

// Spuštění serveru
app.listen(PORT, () => {
    console.log(`Server běží na http://localhost:${PORT}`);
});