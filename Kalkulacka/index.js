document.addEventListener('DOMContentLoaded', function () {
    const display = document.getElementById('display');
    const buttons = document.querySelectorAll('.btn');
    const tableBody = document.querySelector('#counterTable tbody');
    let currentInput = '';
    let operator = '';
    let firstOperand = null;

    // Funkce pro odeslání dat na server
    function sendButtonClick(value) {
        fetch('/api/button-click', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ button: value }),
        })
            .then(response => response.json())
            .then(data => {
                console.log('Úspěšně odesláno:', data);
                fetchAndUpdateTable(); // Aktualizuj tabulku po odeslání dat
            })
            .catch(error => {
                console.error('Chyba při odesílání dat:', error);
            });
    }

    // Funkce pro načtení dat ze serveru a aktualizaci tabulky
    function fetchAndUpdateTable() {
        fetch('/api/button-clicks')
            .then(response => response.json())
            .then(data => {
                // Vymazání tabulky
                tableBody.innerHTML = '';

                // Přidání nových řádků
                for (const [button, count] of Object.entries(data)) {
                    const row = document.createElement('tr');
                    const buttonCell = document.createElement('td');
                    const countCell = document.createElement('td');

                    buttonCell.textContent = button;
                    countCell.textContent = count;

                    row.appendChild(buttonCell);
                    row.appendChild(countCell);
                    tableBody.appendChild(row);
                }
            })
            .catch(error => {
                console.error('Chyba při načítání dat:', error);
            });
    }

    // Při načtení stránky načti data a vykresli tabulku
    fetchAndUpdateTable();

    // Přidání event listeneru pro tlačítka
    buttons.forEach(button => {
        const value = button.getAttribute('data-value');

        button.addEventListener('click', function () {
            sendButtonClick(value);

            // Původní logika pro kalkulačku
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
                    if (firstOperand !== null && operator !== '') {
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
                    } else {
                        firstOperand = parseFloat(currentInput);
                        operator = value;
                        currentInput = '';
                    }
                }
            } else if (value === '%') {
                if (currentInput !== '') {
                    const result = parseFloat(currentInput) / 100;
                    display.textContent = result;
                    currentInput = result.toString();
                }
            } else if (value === 'x²') {
                if (currentInput !== '') {
                    const result = Math.pow(parseFloat(currentInput), 2);
                    display.textContent = result;
                    currentInput = result.toString();
                }
            } else if (value === '√x') {
                if (currentInput !== '') {
                    const result = Math.sqrt(parseFloat(currentInput));
                    display.textContent = result;
                    currentInput = result.toString();
                }
            } else if (value === '¹/x') {
                if (currentInput !== '') {
                    const result = 1 / parseFloat(currentInput);
                    display.textContent = result;
                    currentInput = result.toString();
                }
            } else if (value === '⌫') {
                if (currentInput !== '') {
                    currentInput = currentInput.slice(0, -1);
                    display.textContent = currentInput || '0';
                }
            } else if (value === '+/-') {
                if (currentInput !== '') {
                    currentInput = (parseFloat(currentInput) * -1).toString();
                    display.textContent = currentInput;
                }
            } else {
                if (value === '.' && currentInput.includes('.')) {
                    return; // Prevent adding another decimal dot
                }
                currentInput += value;
                display.textContent = currentInput;
            }
        });
    });
});