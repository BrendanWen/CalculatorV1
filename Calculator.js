let successFlag = false;

let currentValue = 0;
let firstDigit = 0;
let secondDigit = 0;
let newValue = 0;

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

function clearInput() {
    document.getElementById("firstValue").value = "";
    document.getElementById("result").value = "";
}

function equals() {
    currentValue = document.getElementById("result").value;

    let currentValueArray = currentValue.split("");
    console.log(currentValueArray);
    console.log("count before:" + currentValueArray.length);
    while (currentValueArray.length > 2) {
        for (let i = 0; i < currentValueArray.length; i++) {
            if (currentValueArray[i] == "/") {
                // get values left and right of operator
                firstDigit = currentValueArray[i - 1];
                secondDigit = currentValueArray[i + 1];
                newValue = firstDigit / secondDigit;

                // updating left value with new value
                currentValueArray[i - 1] = newValue;

                // remove operator and right value
                currentValueArray.splice(i, 2);
            } else if (currentValueArray[i] == "*") {
                // get values left and right of operator
                firstDigit = currentValueArray[i - 1];
                secondDigit = currentValueArray[i + 1];
                newValue = firstDigit * secondDigit;

                // updating left value with new value
                currentValueArray[i - 1] = newValue;

                // remove operator and right value
                currentValueArray.splice(i, 2);
            }
        }

        for (let i = 0; i < currentValueArray.length; i++) {
            if (currentValueArray[i] == "+") {
                // get values left and right of operator
                firstDigit = +currentValueArray[i - 1];
                secondDigit = +currentValueArray[i + 1];
                newValue = firstDigit + secondDigit;

                // updating left value with new value
                currentValueArray[i - 1] = newValue;

                // remove operator and right value
                currentValueArray.splice(i, 2);
            } else if (currentValueArray[i] == "-") {
                // get values left and right of operator
                firstDigit = +currentValueArray[i - 1];
                secondDigit = +currentValueArray[i + 1];
                newValue = firstDigit - secondDigit;

                // updating left value with new value
                currentValueArray[i - 1] = newValue;

                // remove operator and right value
                currentValueArray.splice(i, 2);
            }
        }
        document.getElementById("result").value = currentValueArray[0];
        console.log("after:" + currentValueArray.length);
    }

    // resetting everything
    successFlag = true;
    firstValue = 0;
    secondValue = 0;
}
