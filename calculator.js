let input = document.getElementById('inputBox');
let buttons = document.querySelectorAll('button');

let firstNumber = '';
let secondNumber = '';
let operator = '';
let result = '';

buttons.forEach(button => {
    button.addEventListener('click', (e) => {
        const buttonText = e.target.innerHTML;
        if (buttonText === 'AC') {
            clearCalculator();
        } else if (buttonText === 'DEL') {
            deleteLastInput();
        } else if (buttonText === '=') {
            if (operator && firstNumber && secondNumber) {
                calculate();
                input.value = result;
                firstNumber = result;
                secondNumber = '';
                operator = '';
            }
        } else if (isOperator(buttonText)) {
            if (firstNumber && operator) {
                calculate();
                input.value = firstNumber;
                operator = buttonText;
                secondNumber = '';
            } else if (firstNumber) {
                operator = buttonText;
            }
        } else {
            if (operator) {
                secondNumber += buttonText;
                input.value = secondNumber;
            } else {
                firstNumber += buttonText;
                input.value = firstNumber;
            }
        }
    });
});

function isOperator(value) {
    return value === '+' || value === '-' || value === '*' || value === '/';
}

function calculate() {
    const num1 = parseFloat(firstNumber);
    const num2 = parseFloat(secondNumber);
    switch (operator) {
        case '+':
            result = (num1 + num2).toFixed(2);
            break;
        case '-':
            result = (num1 - num2).toFixed(2);
            break;
        case '*':
            result = (num1 * num2).toFixed(2);
            break;
        case '/':
            if (num2 === 0) {
                alert('Error: Cannot divide by zero!');
                clearCalculator();
                return;
            }
            result = (num1 / num2).toFixed(2);
            break;
        default:
            result = '';
    }
}

function deleteLastInput() {
    if (operator && secondNumber !== '') {
        secondNumber = secondNumber.slice(0, -1);
        input.value = secondNumber;
    } else if (operator && secondNumber === '') {
        operator = '';
    } else if (firstNumber !== '') {
        firstNumber = firstNumber.slice(0, -1);
        input.value = firstNumber;
    }
}

function clearCalculator() {
    firstNumber = '';
    secondNumber = '';
    operator = '';
    result = '';
    input.value = '';
}