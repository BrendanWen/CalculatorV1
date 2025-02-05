let successFlag = false;
let hasPushedDigit = false;
let hasSelectedDecimal = false;
let hasSelectedPercentage = false;
let hasSelectedBracket = false;
let hasSelectedOperator = true;

let currentValue = "";
let currentValueArray = [];
let firstDigit = 0;
let secondDigit = 0;
let finalValue = 0;
let history = [];

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
    while (!hasSelectedDecimal && !successFlag) {
        // prevent duplicate decimals from being called
        document.getElementById("result").value += value;
        currentValue += value;
        hasSelectedDecimal = true;
    }
}

function percent(value) {
    while (!hasSelectedPercentage && !successFlag) {
        // all percentages are basically dividing by 100
        document.getElementById("result").value += value;
        currentValue /= 100;
        hasSelectedPercentage = true;
    }
}

// function bracket(value) {
//     // check if an open bracket exists
//     if (hasSelectedBracket && !successFlag) {
//         currentValueArray.push(currentValue);
//         currentValue = ")";
//         document.getElementById("result").value += ")";
//         currentValueArray.push(currentValue);
//         console.log("Array after pressing bracket again: " + currentValueArray);
//         return (hasSelectedBracket = false);
//     } else if (!hasSelectedBracket && !successFlag) {
//         document.getElementById("result").value += value;
//         currentValueArray.push(value);
//         console.log("Array pressing first bracket: " + currentValueArray);
//         return (hasSelectedBracket = true);
//     }
// }

function operator(value) {
    while (!hasSelectedOperator && !successFlag) {
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

function backtrack() {
    if (!successFlag) {
        let splitValueArray = currentValue.split(""); // split the current value into individual digits
        let poppedValue = splitValueArray.pop(); // pop the last digit
        if ((poppedValue = /\d/)) {
            // regex to detect digits from 0-9
            hasSelectedOperator = false;
        } else if (poppedValue == ".") {
            hasSelectedDecimal = false;
        } else if (poppedValue == "%") {
            hasSelectedPercentage = false;
        }
        let newDeletedValue = splitValueArray.join(""); // combine the digits to form 1 integer
        currentValue = newDeletedValue;
        document.getElementById("result").value = // display the current array info along with the deleted value
            currentValueArray.join("") + newDeletedValue;
    }
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

function updateArray(position) {
    // updating left value with new value
    currentValueArray[position - 1] = currentValue;
    // remove operator and right value
    currentValueArray.splice(position, 2);
}

function operations(operator, position) {
    // get values left and right of operator
    firstDigit = +currentValueArray[position - 1];
    secondDigit = +currentValueArray[position + 1];

    switch (operator) {
        case "/": {
            currentValue = firstDigit / secondDigit;
            updateArray(position);
            return currentValue;
        }
        case "*": {
            currentValue = firstDigit * secondDigit;
            updateArray(position);
            return currentValue;
        }
        case "+": {
            currentValue = firstDigit + secondDigit;
            updateArray(position);
            return currentValue;
        }
        case "-": {
            currentValue = firstDigit - secondDigit;
            updateArray(position);
            return currentValue;
        }
    }
}

function runCalculations() {
    while (currentValueArray.length > 2) {
        // do division and multiplication first, then plus and minus
        for (let i = 0; i < currentValueArray.length; i++) {
            if (currentValueArray[i] == "/") {
                operations("/", i);
            } else if (currentValueArray[i] == "*") {
                operations("*", i);
            }
        }
        for (let i = 0; i < currentValueArray.length; i++) {
            if (currentValueArray[i] == "+") {
                operations("+", i);
            } else if (currentValueArray[i] == "-") {
                operations("-", i);
            }
        }
    }
}

function equals() {
    //check if currentValue is an operand
    if (hasSelectedOperator) {
        document.getElementById("result").value = "Invalid Output";
    } else if (!hasPushedDigit) {
        // check if currentValue has been pushed to the array for only one time
        currentValueArray.push(currentValue);
        hasPushedDigit = true;
        console.log("final value after refresh: " + currentValueArray);
        runCalculations();
        document.getElementById("result").value = currentValue;
    } else {
        console.log("the end!");
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
