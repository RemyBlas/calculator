const add = function(a,b) {
    return a + b;
}

const substract = function(a,b) {
    return a - b;
}

const multiply = function(a,b) {
    return a * b;
}

const divide = function(a,b) {
    return a / b;
}

function operate(a, symbol, b) {
    switch(symbol) {
        case "+": 
            add(a,b);
            break;
        case "-":
            substract(a,b);
            break;
        case "*":
            multiply(a,b);
            break;
        case "/":
            divide(a,b);
            break;
        default:
            return null;
    }
}