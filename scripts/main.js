function add (a, b) {
    return a + b;
}

function subtract (a, b) {
    return a - b;
}

function multiply (a, b) {
    return a * b;
}

function divide (a, b) {
    return a / b;
}

//Since we can just return a + b, a - b, etc
//there is no need for the separate operation functions
//Maybe simplify?

function operate(a, b, operator) {
    a = parseFloat(a);
    b = parseFloat(b);

    switch(operator) {
        case "+":
            return add(a, b);
        case "-":
            return subtract(a, b);
        case "*":
            return multiply(a, b);
        case "/":
            return divide(a, b);
        default:
            break;
    }
}

const display = document.querySelector(".display");
const displayItems = document.querySelectorAll(".d-item");
let result = "";
let calculated = false;

displayItems.forEach(dItem => {
    dItem.addEventListener('click', (e) => {
        display.textContent += dItem.textContent;
    });
});

function clear() {
    result = "";
    display.textContent = "";
}

const clearButton = document.querySelector(".clear");
clearButton.addEventListener('click', (e) => clear());

//TO-DO: (Maybe) Implement Clear Entry function and event listener

function isValid(equation) {
    //match one or more numbers followed by zero or more decimal points
    //followed by zero or more numbers, then repeat after an operator
    return /^\d+\.*\d*[\+\-\/\*]\d+\.*\d*$/.test(equation);
}

function evaluate(equation) {
    if(isValid(equation)) {
        //extract two numbers and operator, then operate(a,b,operator)
        //and put the result as the display.textContent
        //then set flag to calculated
    }

}



const operators = document.querySelectorAll(".operator");

operators.forEach(operator => {
    operator.addEventListener('click', (e) => {
        //TODO: If previous calculation was there
        //without pressing the = button, calculate
        //that first
        //if(isValid(display.textContent)) evaluate(display.textContent);
        //else if already calculated, set the flag to false and add?
        //I need some rest. lol
        display.textContent += operator.textContent;
    });
});

const equals = document.querySelector(".equals");
equals.addEventListener('click', (e) => evaluate(display.textContent));