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
let content = "";
let result = "";

displayItems.forEach(dItem => {
    dItem.addEventListener('click', (e) => {
        content += dItem.textContent;
        display.textContent = content;
    });
});

function clear() {
    content = "";
    result = "";
    display.textContent = "";
}

const clearButton = document.querySelectorAll(".clear");
cButton.addEventListener('click', (e) => clear());

//TO-DO: (Maybe) Implement Clear Entry function and event listener
