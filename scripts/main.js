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
const nums = document.querySelectorAll(".num");
let result = "";
let calculated = false;

function clear() {
    result = "";
    display.textContent = "";
}

nums.forEach(num => {
    num.addEventListener('click', (e) => {
        if(calculated) {
            clear();
            calculated = false;
        }

        //TODO: Fix behavior for zero, maybe separately, so it doesn't start
        //a number unless followed by a decimal point.
        display.textContent += num.textContent;
    });
});

const clearButton = document.querySelector(".clear");
clearButton.addEventListener('click', (e) => clear());

const dot = document.querySelector(".dot");
dot.addEventListener('click', (e) => {
    //if the result is already calculated, don't add a decimal to it
    if(calculated) return;
    //if there is a decimal point already in this number, don't add another one
    if(/^\d+\.\d*$/.test(display.textContent)) return;
    //if there is a number, then an operator, then another number with a decimal
    //return and also do nothing
    if(/^\d+\.\d*[\+\-\/\*]\d+\.\d*$/.test(display.textContent)) return;
    //otherwise, just add the decimal point
    display.textContent += ".";
});


//TODO: (Maybe) Implement Clear Entry function and event listener

//checks if the equation on display is valid
function isValid() {
    //match one or more numbers followed by zero or more decimal points
    //followed by zero or more numbers, then repeat after an operator
    return /^\d+\.?\d*[\+\-\/\*]\d+\.?\d*$/.test(display.textContent);
}

function evaluate() {
    if(isValid()) {
        //extract two numbers and operator, then operate(a,b,operator)
        let first = display.textContent.match(/\d+\.?\d*/g)[0];
        let second = display.textContent.match(/\d+\.?\d*/g)[1];
        let operator = display.textContent.match(/[\+\-\/\*]/)[0];
        result = operate(first,second,operator);
      
        //if result is a float and has more than two decimal points, shorten it
        if(result % 1 !== 0 && String(result).split('.')[1].length > 2) {
            result = result.toFixed(3);
        }
        display.textContent = result;
        calculated = true;
    }

}

const operators = document.querySelectorAll(".operator");

operators.forEach(operator => {
    operator.addEventListener('click', (e) => {
        //if there's already a full valid operation on screen, evaluate it
        if(isValid()) evaluate();
        //if it's already calculated from before, keep the result, operate
        if(calculated) calculated = false;
        display.textContent += operator.textContent;
    });
});

const equals = document.querySelector(".equals");
equals.addEventListener('click', (e) => evaluate());