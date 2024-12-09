document.addEventListener('DOMContentLoaded', function () {
    const display = document.getElementById('display');
    const buttons = document.querySelectorAll('.btn');
    const tableBody = document.querySelector('#counterTable tbody');
    let currentInput = '';
    let operator = '';
    let firstOperand = null;

    // Funkce pro aktualizaci tabulky statistik
    const updateStatsTable = () => {
        fetch('/api/stats')
            .then(response => response.json())
            .then(data => {
                tableBody.innerHTML = ''; // Vyčistit tabulku
                for (const [key, value] of Object.entries(data)) {
                    const row = document.createElement('tr');
                    row.innerHTML = `<td>${key}</td><td>${value}</td>`;
                    tableBody.appendChild(row);
                }
            })
            .catch(err => console.error('Chyba při načítání statistik:', err));
    };

    // Inicializace statistik při načtení stránky
    updateStatsTable();

    buttons.forEach(button => {
        const value = button.getAttribute('data-value');

        button.addEventListener('click', function () {
            // Logika kalkulačky
            if (value === 'C') {
                currentInput = '';
                operator = '';
                firstOperand = null;
                display.textContent = '0';
            } else if (value === 'CE') {
                currentInput = '';
                display.textContent = '0';
            } else if (value === '=') {
                if (firstOperand !== null && operator !== '' && currentInput !== '') {
                    const secondOperand = parseFloat(currentInput);
                    let result;
                    switch (operator) {
                        case '+':
                            result = firstOperand + secondOperand;
                            break;
                        case '-':
                            result = firstOperand - secondOperand;
                            break;
                        case '*':
                            result = firstOperand * secondOperand;
                            break;
                        case '/':
                            result = firstOperand / secondOperand;
                            break;
                    }
                    display.textContent = result;
                    currentInput = result.toString();
                    firstOperand = null;
                    operator = '';
                }
            } else if (['+', '-', '*', '/'].includes(value)) {
                if (currentInput !== '') {
                    firstOperand = parseFloat(currentInput);
                    operator = value;
                    currentInput = '';
                }
            } else {
                currentInput += value;
                display.textContent = currentInput;
            }

            // Odeslání stisknutí tlačítka na server
            fetch('/api/button-press', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ buttonValue: value }),
            })
                .then(() => updateStatsTable())
                .catch(err => console.error('Chyba při odesílání tlačítka:', err));
        });
    });
});