document.addEventListener('DOMContentLoaded', function() {
    const display = document.getElementById('display');
    const buttons = document.querySelectorAll('.btn');
    const counterTableBody = document.querySelector('#counterTable tbody');
    let currentInput = '';
    let operator = '';
    let firstOperand = null;
    const buttonPressCounts = {};

    buttons.forEach(button => {
        const value = button.getAttribute('data-value');
        buttonPressCounts[value] = 0;

        button.addEventListener('click', function() {
            buttonPressCounts[value]++;
            updateCounterTable();

            if (value === 'C') {
                currentInput = '';
                operator = '';
                firstOperand = null;
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
                        firstOperand = result;
                    } else {
                        firstOperand = parseFloat(currentInput);
                    }
                    operator = value;
                    currentInput = '';
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

    function updateCounterTable() {
        counterTableBody.innerHTML = '';
        for (const [key, count] of Object.entries(buttonPressCounts)) {
            const row = document.createElement('tr');
            const buttonCell = document.createElement('td');
            const countCell = document.createElement('td');
            buttonCell.textContent = key;
            countCell.textContent = count;
            row.appendChild(buttonCell);
            row.appendChild(countCell);
            counterTableBody.appendChild(row);
        }
    }
});
