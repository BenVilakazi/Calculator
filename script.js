function operate(){
    switch(prevSymbol){
        case "+":
            answer = prevAns + +input;
            break;
        case "–":
            answer = prevAns - +input;
            break;    
        case "x":
            answer = prevAns * +input;
            break;
        case "÷":
            if(+input == 0) divByZero = true;
            else answer = prevAns / +input;
            break;
        case null:
            answer = +input;
            break;
    }

    //Update texts contained in display div
    if(prevSymbol == null)  upper.textContent = `${answer} ${symbol} `;
    else if (symbol == "=") upper.textContent = `${+prevAns} ${prevSymbol} ${+input} =`;
    else upper.textContent = `${answer} ${symbol} `;
    bottom.textContent = Math.round(+answer * 1000000000)/1000000000;
    
    prevAns     = +answer;
    prevSymbol  = symbol;
    newNumber   = true;
    if(divByZero == true) indeterminate();
}

//Used if a number is divided by zero
function indeterminate(){
    bottom.textContent = "Cannot divide by 0";
    num.forEach((num) => num.disabled = true);
    op.forEach((op) => op.disabled = true);
    back.disabled = true;
    dot.disabled = true;
}

function numberInput(num){
    if(newNumber){
        input = 0;
        newNumber = false;
    }
    op.forEach((op) => op.disabled = false);
    dot.disabled = false;
    input += num;
    bottom.textContent = +input;
}

function opInput(op){
    symbol = op;
    if(!newNumber) operate();
    else {
        upper.textContent = `${answer} ${symbol} `;
        prevSymbol = symbol;
    }
}

function backInput(){
    if(input){
        bottom.textContent = bottom.textContent.slice(0, -1);
        input = bottom.textContent;
    }
}

function dotInput(){
    input += dot.textContent;
    bottom.textContent = +input;
}

function keyboardInput(key){
    if      (key >= 0 || key <= 9) numberInput(key);
    else if (key === "+") opInput("+");
    else if (key === "-") opInput("–");
    else if (key === "*" || key === "X"  || key === "x") opInput("x");
    else if (key === "/" || key === "\\" || key === "%") opInput("÷");
    else if (key === "=" || key === "Enter") opInput("=");
    else if (key === "." || key === ",") dotInput();
    else if (key === "Escape") clearInput();
    else if (key === "Delete" || key === "Backspace" || key === "Del") backInput();
}

function clearInput(){
    upper.textContent   = "";
    bottom.textContent  = 0;

    input       = null;
    answer      = null;
    prevAns     = null;
    symbol      = null;
    prevSymbol  = null;
    newNumber   = true;
    divByZero   = false;
    
    num.forEach((num) => num.disabled = false);
    op.forEach((op) => op.disabled = true);
    minus.disabled = false;
    back.disabled = false;
    dot.disabled = true;
}

let input       = null;
let answer      = null;
let prevAns     = null;
let symbol      = null;
let prevSymbol  = null;
let newNumber   = true;
let divByZero   = false;

const upper     = document.querySelector(".upper");
const bottom    = document.querySelector(".bottom");
const clear     = document.querySelector(".clear");
const back      = document.querySelector(".back");
const dot       = document.querySelector(".dot");
const minus     = document.querySelector(".minus");
const num       = document.querySelectorAll(".num");
const op        = document.querySelectorAll(".op");

op.forEach((op) => op.disabled = true);
minus.disabled = false;
dot.disabled = true;

num.forEach((num)   => {num.addEventListener("click", () => numberInput(num.textContent));});
op.forEach((op)     => {op.addEventListener("click", () => opInput(op.textContent));});
document.addEventListener('keydown', (e) => keyboardInput(e.key));
clear.addEventListener("click", () => clearInput());
back.addEventListener("click", () => backInput());
dot.addEventListener("click", () => dotInput());