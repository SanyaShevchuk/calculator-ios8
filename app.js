var digits = document.getElementsByClassName('digit');
var signs = document.getElementsByClassName('sign');
var inputPanel = document.getElementById('field');
var clearBtn = document.getElementById('clear');
var firstNumber, secondNumber, sign, result;
var equal = document.getElementById('equal');
var deleteSymbol = document.getElementById('deleteSymbol');

function reset(){
    inputPanel.innerHTML = "";
    firstNumber = "";
    secondNumber = "";
    sign = "";
    result = "";
}

reset();

clearBtn.addEventListener('click', reset);

// delete previous symbol 
deleteSymbol.addEventListener('click', function(){
    if(Number.isInteger(Number(inputPanel.innerHTML[inputPanel.innerHTML.length-1]))){
        if(secondNumber) secondNumber = secondNumber.substr(0, secondNumber.length-1);
        else firstNumber = firstNumber.substr(0, firstNumber.length-1);
    } else sign="";
    inputPanel.innerHTML = inputPanel.innerHTML.substr(0, inputPanel.innerHTML.length-1);
    
});

/**
 * if we do not type 0 and put dot '.' automatically it will fill field with 0.
 */
function digitsListener(item, i){
    item.addEventListener('click', function(){
        if(digits[i].textContent==='.'){
            if(!sign && firstNumber.indexOf('.')>-1) return;
            if(sign && secondNumber.indexOf('.')>-1) return;
        }
        if((!firstNumber && digits[i].textContent==='.') ||
        (sign && !secondNumber && digits[i].textContent==='.')) {
            inputPanel.innerHTML+="0";
        }
        inputPanel.innerHTML+=digits[i].textContent;
        if(sign===""){
            firstNumber+=digits[i].textContent;
        }
        else {
            secondNumber+=digits[i].textContent;
        }
    })
};

/**
 * if there is empty field we can not type any sign except minus
 */
function signListener(item, i){
    item.addEventListener('click', function(){
        if(firstNumber){
            if(sign==""){
                inputPanel.innerHTML+=signs[i].textContent;
                sign = signs[i].textContent;
            }
            else if(!secondNumber){
                sign = signs[i].textContent;
                inputPanel.innerHTML = inputPanel.innerHTML.substr(0, inputPanel.innerHTML.length-1) + sign;
            } else {
                calculate();
                firstNumber = result;
                sign = signs[i].textContent;
                secondNumber = '';
                inputPanel.innerHTML=result + signs[i].textContent;
            }
        } else if(signs[i].textContent==="-") {
            inputPanel.innerHTML+=signs[i].textContent;
            firstNumber+='-';
        } else if(firstNumber!='' && secondNumber!=''){
            calculate();
            firstNumber = result;
            secondNumber = '';
            sign = '';
            inputPanel.innerHTML+=sign[i].textContent;
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
    firstNumber = Number(firstNumber) || 0;
    secondNumber = Number(secondNumber);
    switch(sign){
        case "-": minus();break;
        case "+": plus();break;
        case "÷": divide();break;
        case "×": multiply();break;
    }
}

equal.addEventListener('click', function(){
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
    if(secondNumber === 0)
        inputPanel.innerHTML = '&infin;';
    else result = firstNumber / secondNumber;
}
function multiply(){
    result = firstNumber * secondNumber;
}
