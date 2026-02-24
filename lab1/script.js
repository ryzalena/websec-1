const getElement = (id) => {
    const element = document.getElementById(id);
    if (!element) {
        throw new Error(`Элемент с id "${id}" не найден на странице.`);
    }
    return element;
};

try {
    var num1Input = getElement('num1');
    var num2Input = getElement('num2');
    var operatorSelect = getElement('operator');
    var calculateBtn = getElement('calculateBtn');
    var historyP = getElement('history');
    var currentResultP = getElement('currentResult');
} catch (error) {
    console.error('Ошибка инициализации:', error.message);
}

let history = [null, null];

function calculate(num1, num2, operator) {
    switch (operator) {
        case '+': return num1 + num2;
        case '-': return num1 - num2;
        case '*': return num1 * num2;
        case '/':
            if (num2 === 0) {
                throw new Error('Вы еще не изучали деление на ноль!');
            }
            return num1 / num2;
        default:
            throw new Error(`Неизвестная операция: "${operator}"`);
    }
}

function formatNumber(num) {
    return Number.isInteger(num) ? num.toString() : num.toFixed(2);
}

function formatOperation(num1, num2, operator, result) {
    return `${formatNumber(num1)} ${operator} ${formatNumber(num2)} = ${formatNumber(result)}`;
}

function updateHistoryDisplay() {
    historyP.textContent = history[0] || '';
}

function validateAndParseInputs(rawNum1, rawNum2) {
    if (rawNum1.trim() === '' || rawNum2.trim() === '') {
        throw new Error('Заполните оба поля');
    }

    const num1 = parseFloat(rawNum1);
    const num2 = parseFloat(rawNum2);

    if (isNaN(num1) || isNaN(num2)) {
        throw new Error('Введите корректные числа');
    }

    return { num1, num2 };
}

calculateBtn.addEventListener('click', () => {
    try {
        const { num1, num2 } = validateAndParseInputs(num1Input.value, num2Input.value);
        const operator = operatorSelect.value;
        const result = calculate(num1, num2, operator);
        const currentOperationString = formatOperation(num1, num2, operator, result);
        
        currentResultP.textContent = currentOperationString;
        history = [history[1], currentOperationString];
        updateHistoryDisplay();

    } catch (error) {
        currentResultP.textContent = `Ошибка: ${error.message}`;
    }
});