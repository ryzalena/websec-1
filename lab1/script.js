document.addEventListener('DOMContentLoaded', function() {
    const num1Input = document.getElementById('num1');
    const num2Input = document.getElementById('num2');
    const operatorSelect = document.getElementById('operator');
    const calculateBtn = document.getElementById('calculateBtn');
    const historyDiv = document.getElementById('history');
    const currentResultDiv = document.getElementById('currentResult');
    
    let history = [];

    function calculate(num1, num2, operator) {
        switch(operator) {
            case 'plus':
                return num1 + num2;
            case 'minus':
                return num1 - num2;
            case 'multiplication':
                return num1 * num2;
            case 'division':
                if (num2 === 0) {
                    throw new Error('Вы еще не изучали деление на ноль!');
                }
                return num1 / num2;
            default:
                throw new Error('Неизвестная операция');
        }
    }

    function formatOperation(num1, num2, operator, result) {
        const operatorSymbol = {
            'plus': '+',
            'minus': '-',
            'multiplication': '*',
            'division': '/'
        }[operator];
        
        // Форматируем числа: если целые, показываем без десятичной части
        const formatNumber = (num) => Number.isInteger(num) ? num : num.toFixed(2);
        
        return `${formatNumber(num1)} ${operatorSymbol} ${formatNumber(num2)} = ${formatNumber(result)}`;
    }

    function updateHistory() {
        if (history.length === 0) {
            historyDiv.innerHTML = ''; // Очищаем историю, если нет записей
            return;
        }
        
        // Берем последнюю запись из истории
        const lastOperation = history[history.length - 1];
        
        // Если есть предыдущая запись (не первая операция), показываем её в истории
        if (history.length > 1) {
            const previousOperation = history[history.length - 2];
            historyDiv.innerHTML = previousOperation;
        } else {
            // Если это первая операция, показываем её же в истории (бледным шрифтом)
            historyDiv.innerHTML = lastOperation;
        }
    }

    function validateInputs() {
        const num1 = num1Input.value.trim();
        const num2 = num2Input.value.trim();
        
        if (num1 === '' || num2 === '') {
            throw new Error('Заполните оба поля');
        }
        
        const num1Val = parseFloat(num1);
        const num2Val = parseFloat(num2);
        
        if (isNaN(num1Val) || isNaN(num2Val)) {
            throw new Error('Введите корректные числа');
        }
        
        return { num1: num1Val, num2: num2Val };
    }

    calculateBtn.addEventListener('click', function(e) {
        e.preventDefault();
        
        try {
            const { num1, num2 } = validateInputs();
            const operator = operatorSelect.value;
            const result = calculate(num1, num2, operator);
            
            // Форматируем числа для отображения
            const formatDisplay = (num) => Number.isInteger(num) ? num : num.toFixed(2);
            
            const formattedResult = Number.isInteger(result) ? result : result.toFixed(2);
            
            const operationStr = formatOperation(num1, num2, operator, result);
            history.push(operationStr);
            
            // Обновляем историю (показываем предыдущую операцию)
            updateHistory();
            
            // Показываем текущий результат
            currentResultDiv.textContent = `${formatDisplay(num1)} ${operatorSelect.options[operatorSelect.selectedIndex].text} ${formatDisplay(num2)} = ${formattedResult}`;
            
        } catch (error) {
            currentResultDiv.innerHTML = `<span class="error-message">Ошибка: ${error.message}</span>`;
        }
    });
});