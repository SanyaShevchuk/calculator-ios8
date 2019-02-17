var digits = document.getElementsByClassName('digit');
var signs = document.getElementsByClassName('sign');
var inputPanel = document.getElementById('field');
var clearBtn = document.getElementById('clear');
var firstNumber, secondNumber, sign, result;
var equal = document.getElementById('equal');
// var dot = document.getElementById('dot');

function reset(){
    inputPanel.innerHTML = "";
    firstNumber = "";
    secondNumber = "";
    sign = "";
    result = "";
}

reset();

clearBtn.addEventListener('click', reset);

function digitsListener(item, i){
    item.addEventListener('click', function(){
        if((!firstNumber && digits[i].textContent==='.')||(!secondNumber && digits[i].textContent==='.') &&
        (Number.isInteger(Number(inputPanel.innerHTML[inputPanel.innerHTML.length-1]))||sign)) {
            inputPanel.innerHTML+="0";
        }
        inputPanel.innerHTML+=digits[i].textContent;
        if(sign==="")
            firstNumber+=digits[i].textContent;
        else secondNumber+=digits[i].textContent;
    })
};

function signListener(item, i){
    item.addEventListener('click', function(){
        if(firstNumber){
            if(sign==""){
                inputPanel.innerHTML+=signs[i].textContent;
                sign = signs[i].textContent;
            }
            else{
                sign = signs[i].textContent;
                inputPanel.innerHTML = inputPanel.innerHTML.substr(0, inputPanel.innerHTML.length-1) + sign;
            }
        } else if(signs[i].textContent==="-") {
            inputPanel.innerHTML+=signs[i].textContent;
            firstNumber+='-';
        }
        
    });
};

for(var i=0; i < signs.length; i++){
    signListener(signs[i],i);
}

for(var i=0; i < digits.length; i++){
    digitsListener(digits[i],i);
}

function calculate(){
    switch(sign){
        case "-": minus();break;
        case "+": plus();break;
        case "÷": divide();break;
        case "×": multiply();break;
    }
}

// dot.addEventListener('click', function(){
//     if(inputPanel.innerHTML == ""){
//         inputPanel.innerHTML = "0.";
//         firstNumber = "0.";
//     } else {
//         inputPanel.innerHTML+=dot.textContent;
//         firstNumber+=dot.textContent;
//     }
// })

equal.addEventListener('click', function(){
    firstNumber = Number(firstNumber);
    secondNumber = Number(secondNumber);
    calculate();
    result = Number(result.toFixed(10));
    inputPanel.innerHTML = result;
    firstNumber = String(result);
    sign="";
    secondNumber = "";
});

function minus(){
    result = firstNumber - secondNumber;
}
function plus(){
    result = firstNumber + secondNumber;
}
function divide(){
    result = firstNumber / secondNumber;
}
function multiply(){
    result = firstNumber * secondNumber;
}
