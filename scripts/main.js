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
    //if there is a decimal point before, don't add another one
    if(display.textContent.charAt(display.textContent.length-1)==".") return;
    //if there is a decimal point already in this number, don't add another one
    if(/^\d+\.\d+$/.test(display.textContent)) return;
    //if there is a number, then an operator, then another number with a decimal
    //return and also do nothing
    if(/^\d+\.*\d*[\+\-\/\*]\d+\.\d*$/.test(display.textContent)) return;
    //otherwise, just add the decimal point
    display.textContent += ".";
});


//TO-DO: (Maybe) Implement Clear Entry function and event listener

function isValid() {
    //match one or more numbers followed by zero or more decimal points
    //followed by zero or more numbers, then repeat after an operator
    return /^\d+\.*\d*[\+\-\/\*]\d+\.*\d*$/.test(display.textContent);
}

function evaluate() {
    if(isValid()) {
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
        //if(isValid()) evaluate();
        //else if already calculated, set the flag to false and add?
        //I need some rest. lol
        display.textContent += operator.textContent;
    });
});

const equals = document.querySelector(".equals");
equals.addEventListener('click', (e) => evaluate(display.textContent));