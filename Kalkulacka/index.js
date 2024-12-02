document.addEventListener('DOMContentLoaded', function() {
    const display = document.getElementById('display');
    const buttons = document.querySelectorAll('.btn');
    let currentInput = '';
    let operator = '';
    let firstOperand = null;

    buttons.forEach(button => {
        const value = button.getAttribute('data-value');

        button.addEventListener('click', function() {
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
