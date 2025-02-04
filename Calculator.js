let additionFlag = false;
let minusFlag = false;
let multiplyFlag = false;
let divisionFlag = false;
let successFlag = false;

let firstValue = 0;
let secondValue = 0;
let output = 0;

function printNumber(value) {
    if (successFlag) {
        document.getElementById("result").value = "";
        successFlag = false;
    }
    document.getElementById("result").value += value;
}

function backtrack() {
    let stringValue = document.getElementById("result").value;
    let stringValueArray = stringValue.split("");
    stringValueArray.pop();
    let newValue = stringValueArray.join("");
    document.getElementById("result").value = newValue;
}

function storeFirstValue() {
    if (document.getElementById("result").value) {
        firstValue = +(document.getElementById("result").value);
        document.getElementById("firstValue").value = firstValue;
        document.getElementById("result").value = "";
    }
}

function add() {
    additionFlag = true;
}

function minus() {
    minusFlag = true;
}

function multiply() {
    multiplyFlag = true;
}

function divide() {
    divisionFlag = true;
}

function clearInput() {
    document.getElementById("firstValue").value = "";
    document.getElementById("result").value = "";
}

function equals() {
    secondValue = parseInt(document.getElementById("result").value);
    
    if (additionFlag) {
        output = firstValue + secondValue;
    } else if (minusFlag) {
        output = firstValue - secondValue;
    } else if (multiplyFlag) {
        output = firstValue * secondValue;
    } else if (divisionFlag) {
        output = firstValue / secondValue;
    }

    additionFlag = false;
    minusFlag = false;
    multiplyFlag = false;
    divisionFlag = false;

    document.getElementById("result").value = output;

    // resetting everything
    successFlag = true;
    firstValue = 0;
    secondValue = 0;
}