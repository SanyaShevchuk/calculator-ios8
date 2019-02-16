var digits = document.getElementsByClassName('digit');
var sign = document.getElementsByClassName('sign');
var inputPanel = document.getElementById('field');
var clearBtn = document.getElementById('clear');
var firstNumber, secondNumber;

// digits.forEach(function(item){
  
// });

clearBtn.addEventListener('click', function(){
    inputPanel.innerHTML = '';
});

function stickListener(item, i){
    item.addEventListener('click', function(){
        inputPanel.innerHTML+=digits[i].textContent;
    })
};

// digits.every(stickListener);

for(var i=0; i < digits.length; i++){
    stickListener(digits[i],i);
}

//digits.forEach(stickListener);
// digits[0].addEventListener("click", function(){ 
//     inputPanel.innerHTML = digits[0].textContent;
//     });