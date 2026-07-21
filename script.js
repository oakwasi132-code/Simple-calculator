const display = document.getElementById('display');

function appendNumber(num) {
    if (display.value === '0' && num !== '.') {
        display.value = num;
    } else {
        display.value += num;
    }
}

function appendOperator(operator) {
    const lastChar = display.value[display.value.length - 1];
    
    // Prevent multiple operators in a row
    if (['+', '-', '*', '/'].includes(lastChar)) {
        return;
    }
    
    if (display.value === '') {
        return;
    }
    
    display.value += operator;
}

function deleteLast() {
    display.value = display.value.slice(0, -1);
}

function clearDisplay() {
    display.value = '';
}

function calculate() {
    try {
        // Evaluate the expression
        const result = eval(display.value);
        
        // Check for valid result
        if (isNaN(result) || !isFinite(result)) {
            display.value = 'Error';
        } else {
            // Round to 10 decimal places to avoid floating point errors
            display.value = Math.round(result * 10000000000) / 10000000000;
        }
    } catch (error) {
        display.value = 'Error';
    }
}

// Allow keyboard input
document.addEventListener('keydown', (e) => {
    if (e.key >= '0' && e.key <= '9') {
        appendNumber(e.key);
    } else if (e.key === '.') {
        appendNumber('.');
    } else if (e.key === '+' || e.key === '-' || e.key === '*' || e.key === '/') {
        appendOperator(e.key);
    } else if (e.key === 'Enter' || e.key === '=') {
        calculate();
    } else if (e.key === 'Backspace') {
        deleteLast();
    } else if (e.key === 'Escape') {
        clearDisplay();
    }
});