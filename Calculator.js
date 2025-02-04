let successFlag = false;
let hasPushedDigit = false;
let hasSelectedDecimal = false;
let hasSelectedPercentage = false;
let hasSelectedOperator = true;

let currentValue = "";
let currentValueArray = [];
let firstDigit = 0;
let secondDigit = 0;
let finalValue = 0;

function printNumber(value) {
    if (successFlag) {
        // check whether there was a previous output
        document.getElementById("previousValue").value =
            document.getElementById("result").value;
        document.getElementById("result").value = "";
        successFlag = false;
    }

    document.getElementById("result").value += value;
    currentValue += value;
    hasSelectedOperator = false;
    console.log("currentValue: " + currentValue);
}

function decimal(value) {
    while (!hasSelectedDecimal) {
        // prevent duplicate decimals from happening
        document.getElementById("result").value += value;
        currentValue += value;
        hasSelectedDecimal = true;
    }
}

function percent(value) {
    while (!hasSelectedPercentage) {
        // all percentages are basically dividing by 100
        document.getElementById("result").value += value;
        currentValue /= 100;
        hasSelectedPercentage = true;
    }
}

function bracket(value) {
    document.getElementById("result").value += value;
}

function operator(value) {
    while (!hasSelectedOperator) {
        document.getElementById("result").value += value;
        currentValueArray.push(currentValue); // push existing digit value
        currentValueArray.push(value); // push operator value
        currentValue = ""; // reset existing value
        hasPushedDigit = false;
        hasSelectedDecimal = false;
        hasSelectedPercentage = false;
        hasSelectedOperator = true;
        console.log("array after pressing operator: " + currentValueArray);
    }
}

function bracket() {}

function backtrack() {
    let stringValue = document.getElementById("result").value;
    let stringValueArray = stringValue.split("");
    let poppedValue = stringValueArray.pop();
    if ((poppedValue = /\d/)) {
        // regex to detect digits from 0-9
        hasSelectedOperator = false;
    } else if (poppedValue == ".") {
        hasSelectedDecimal = false;
    } else if (poppedValue == "%") {
        hasSelectedPercentage = false;
    }
    let newDeletedValue = stringValueArray.join("");
    document.getElementById("result").value = newDeletedValue;
}

function clearInput() {
    document.getElementById("previousValue").value = "";
    document.getElementById("result").value = "";
    currentValue = "";
    currentValueArray = [];
    hasSelectedDecimal = false;
    hasSelectedPercentage = false;
    hasSelectedOperator = true;
}

function calculate(operator, position) {
    switch (operator) {
        case "/": {
            // get values left and right of operator
            firstDigit = currentValueArray[position - 1];
            secondDigit = currentValueArray[position + 1];
            currentValue = firstDigit / secondDigit;
            // updating left value with new value
            currentValueArray[position - 1] = currentValue;
            // remove operator and right value
            currentValueArray.splice(position, 2);
            console.log("value array after dividing: " + currentValueArray);
        }
        case "+": {
            // get values left and right of operator
            firstDigit = +currentValueArray[position - 1];
            secondDigit = +currentValueArray[position + 1];
            currentValue = firstDigit + secondDigit;
            // updating left value with new value
            currentValueArray[position - 1] = currentValue;
            // remove operator and right value
            currentValueArray.splice(position, 2);
        }
    }
}

function equals() {
    // check if currentValue has been pushed to the array one time
    if (!hasPushedDigit) {
        currentValueArray.push(currentValue);
        hasPushedDigit = true;
        console.log("final value after refresh: " + currentValueArray);
    }

    while (currentValueArray.length > 2) {
        for (let i = 0; i < currentValueArray.length; i++) {
            if (currentValueArray[i] == "/") {
                calculate("/", i);
            } else if (currentValueArray[i] == "*") {
                // get values left and right of operator
                firstDigit = currentValueArray[i - 1];
                secondDigit = currentValueArray[i + 1];
                currentValue = firstDigit * secondDigit;
                // updating left value with new value
                currentValueArray[i - 1] = currentValue;
                // remove operator and right value
                currentValueArray.splice(i, 2);
            }
        }
        for (let i = 0; i < currentValueArray.length; i++) {
            if (currentValueArray[i] == "+") {
                calculate("+", i);
            } else if (currentValueArray[i] == "-") {
                // get values left and right of operator
                firstDigit = +currentValueArray[i - 1];
                secondDigit = +currentValueArray[i + 1];
                currentValue = firstDigit - secondDigit;
                // updating left value with new value
                currentValueArray[i - 1] = currentValue;
                // remove operator and right value
                currentValueArray.splice(i, 2);
            }
        }

        document.getElementById("result").value = currentValue;
    }
    // resetting everything
    successFlag = true;
    firstValue = 0;
    secondValue = 0;
    currentValue = "";
    currentValueArray = [];
    hasSelectedDecimal = false;
    hasSelectedPercentage = false;
}
