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
    if(b === 0) {
        display.textContent = "Don't do that.";
        calculated = true;
    }
    return a / b;
}


function operate(a, b, operator) {
    a = parseFloat(a, 10);
    b = parseFloat(b, 10);

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
let sound = false;

function clear() {
    result = "";
    display.textContent = "";
}

//numbers behavior
function numsBehavior(num) {
    if(calculated) {
        clear();
        calculated = false;
    }

    display.textContent += num.textContent;
}

nums.forEach(num => num.addEventListener('click', (e) => numsBehavior(num)));

//clear button behavior
const clearButton = document.querySelector(".clear");
clearButton.addEventListener('click', (e) => clear());

//decimal point behavior
function decimalBehavior(decimal) {
    //if there is nothing, don't add a decimal point
    if(display.textContent === "") return;
    //if the result is already calculated, don't add a decimal to it
    if(calculated) return;
    //if there is a decimal point already in this number, don't add another one
    if(/^\d+\.\d*$/.test(display.textContent)) return;
    //if there is a number, then an operator, then another number with a decimal
    //return and also do nothing
    if(/^\d+\.*\d*[\+\-\/\*]\d+\.\d*$/.test(display.textContent)) return;
    //if there is an operator before, don't add a decimal
    if(/^\d+\.*\d*[\+\-\/\*]$/.test(display.textContent)) return;
    //otherwise, just add the decimal point
    display.textContent += ".";
}
const dot = document.querySelector(".dot");
dot.addEventListener('click', (e) => decimalBehavior(dot));


//TODO: (Maybe) Implement Clear Entry function and event listener

//checks if the operation on display is valid
function isValid() {
    //match one or more numbers followed by zero or more decimal points
    //followed by zero or more numbers, then repeat after an operator
    return /^\d+\.?\d*[\+\-\/\*]\d+\.?\d*$/.test(display.textContent);
}

//evaluates whatever is on the display
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

//operators behavior
function operatorsBehavior(oper) {
        //if not valid and not a number, don't do anything
        if(!isValid() && !/^\d+\.?\d*/.test(display.textContent)) return;
        //if operator is right before, don't add another operator
        if(/^\d+\.*\d*[\+\-\/\*]$/.test(display.textContent)) return;
        //if there is a decimal point right before, don't add an operator
        if(display.textContent.charAt(display.textContent.length-1) ===".") return;
        //if there's already a full valid operation on screen, evaluate it
        if(isValid()) evaluate();
        //if it's already calculated from before, keep the result, operate
        if(calculated) calculated = false;
        display.textContent += oper.textContent
}

const operators = document.querySelectorAll(".operator");
operators.forEach(operator => 
    operator.addEventListener('click', (e) => operatorsBehavior(operator)));

//equals behavior
const equals = document.querySelector(".equals");
equals.addEventListener('click', (e) => evaluate());

//backspace behavior
const backspace = document.querySelector(".backspace");
backspace.addEventListener('click', (e) => {
    display.textContent = display.textContent.slice(0,display.textContent.length-1);
});

//sound mute / unmute button behavior
const soundButton = document.querySelector(".sound");
soundButton.style.textDecoration = 'line-through';

function muteBehavior(button) {
     if(sound) {
        sound = false;
        button.style.textDecoration = 'line-through';
        document.getElementById("blip-r").play();
    }
    else {
        sound = true;
        button.style.textDecoration = 'none';
        document.getElementById("blip").play();
    }
}
soundButton.addEventListener('click', (e) => muteBehavior(soundButton));

//button press sound behavior
const soundButtons = document.querySelectorAll(".s");
function soundBehavior() {
      if(sound) {
            //rewind the sound first so it always plays from the top
            document.getElementById("button-beep").currentTime = 0;
            document.getElementById("button-beep").play();
        }
}

soundButtons.forEach(soundButton =>
    soundButton.addEventListener('click', (e) => soundBehavior()));