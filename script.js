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

const key = document.addEventListener("keypress", (event) => {
    keyboardInput(event);
})

const clearingKeys = document.addEventListener("keydown", (event) => {
    let k = String(event.key);

    if (k === "Backspace") {
        deleteOneChar();
    } else if (k === "Escape") {
        clearDisplay();
    } else {
        return;
    }
})

//funciones
function keyboardInput(event) {
    const digits = [];
    for (let i=0; i<=9; i++) {
        digits.push(String(i));
    }
    const operators = ["+", "-", "*", "/"]
    let k = String(event.key);

    if (digits.includes(k)) {
        updateDisplay(k);
    } else if (operators.includes(k)) {
        prepateOperation(k);
    } else if (k === "=" || k === "Enter") {
        evaluate();
    } else {
        return;
    }
};

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
    const buttons = document.querySelectorAll(".operator")
    buttons.forEach(button => {
        button.classList.remove("selectedOperator");
    })
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
    if (display.textContent === "") {
        displayValue = "0";
        display.textContent = "0";
    }
}



//funciones de operaciones
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
        case "/":
            if (b === 0) return null;
            else return divide(a,b);
        default:
            return null;
    }
};