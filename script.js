//valor inicial del display
let displayValue = "0";
let firstValue = "";
let currentOperation;

const display = document.querySelector(".display");
display.textContent = displayValue

const subdisplay = document.querySelector(".subdisplay");

//event listeners
const buttons = document.querySelectorAll(".number");
buttons.forEach(button => {
    button.addEventListener("click", function() {
        updateDisplay(button.id);
    });
});

const dot = document.getElementById("dot");
dot.addEventListener("click", function() { addDot() })

const clear = document.getElementById("clear");
clear.addEventListener("click", clearDisplay);

const backspace = document.querySelector("#backspace");
backspace.addEventListener("click", function() { deleteOneChar() });

const operators = document.querySelectorAll(".operator");
operators.forEach(button => {
    button.addEventListener("click", function() {
        prepateOperation(button.id);
    })
})

const equals = document.getElementById("=");
equals.addEventListener("click", function() { evaluate() });

//funciones
function updateDisplay(n) {
    if (displayValue === "0" || displayValue === firstValue) {
        displayValue = n;
    } else {
        displayValue += n;
    }
    display.textContent = displayValue;
};

function addDot() {
    if (display.textContent.includes(".")) {
        return;
    } else {
        displayValue += ".";
        display.textContent += ".";
    }
}

function prepateOperation(op) {
    firstValue = displayValue;
    currentOperation = op;
    subdisplay.textContent = `${firstValue} ${currentOperation}`;
}

function evaluate() {
    if (!currentOperation) { return }
    else if (currentOperation === "÷" && displayValue === "0") {
        display.textContent = "0";
        alert("Can't divide by 0");
    } else {
        display.textContent = operate(firstValue, currentOperation, displayValue);
        subdisplay.textContent += ` ${displayValue} =`
        firstValue = "";
        currentOperation = "";
        displayValue = display.textContent;
    }
}

function clearDisplay() {
    displayValue = "0";
    display.textContent = "0";
    subdisplay.textContent = "";
}

function deleteOneChar() {
    display.textContent = display.textContent.slice(0, -1);
    displayValue = display.textContent;
}

//funciones de cada operación
const add = function(a,b) {
    return a + b;
};

const substract = function(a,b) {
    return a - b;
};

const multiply = function(a,b) {
    return a * b;
};

const divide = function(a,b) {
    return a / b;
};

function operate(a, op, b) {
    a = Number(a);
    b = Number(b);
    switch(op) {
        case "+": 
            return add(a,b);
        case "-":
            return substract(a,b);
        case "x":
            return multiply(a,b);
        case "÷":
            if (b === 0) return null;
            else return divide(a,b);
        default:
            return null;
    }
};