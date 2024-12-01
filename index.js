// Initialize variables
let num1 = "";
let operator = "";
let num2 = "";
let currentDisplayValue = "";
let isOperatorSelected = false; // Tracks if an operator was selected

const display = document.querySelector(".display");
const digitButtons = document.querySelectorAll(".digit");
const operatorButtons = document.querySelectorAll(".operator");
const equalsButton = document.querySelector(".equals");
const clearButton = document.querySelector(".clear");


function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    if (b === 0) {
        return "Cannot divide by zero"; // Handle divide-by-zero error
    }
    return a / b;
}

// Function to handle the operation
function operate(operator, num1, num2) {
    if (operator === "+") {
        return add(num1, num2);
    } else if (operator === "-") {
        return subtract(num1, num2);
    } else if (operator === "*") {
        return multiply(num1, num2);
    } else if (operator === "/") {
        return divide(num1, num2);
    } else {
        return "Invalid operator";
    }
}

// Function to update the display
function updateDisplay() {
    display.textContent = currentDisplayValue || "0"; // Default to "0" if empty
}

// Handle digit button clicks
digitButtons.forEach((button) => {
    button.addEventListener("click", () => {
        const digit = button.textContent;

        // Handle input differently based on whether an operator was selected
        if (isOperatorSelected) {
            // Append to the second number
            currentDisplayValue += digit;
            num2 = currentDisplayValue;
        } else {
            // Append to the first number
            currentDisplayValue += digit;
            num1 = currentDisplayValue;
        }

        updateDisplay(); // Update the display
    });
});

// Handle operator button clicks
operatorButtons.forEach((button) => {
    button.addEventListener("click", () => {
        if (currentDisplayValue !== "") {
            num1 = currentDisplayValue;
            operator = button.textContent; // Save the operator
            currentDisplayValue = ""; // Clear display for num2
            updateDisplay();
            console.log("Operator selected:", operator);
        }
    });
});

equalsButton.addEventListener("click", () => {
    if (num1 !== "" && operator !== "" && currentDisplayValue !== "") {
        num2 = currentDisplayValue;
        const result = operate(operator, parseFloat(num1), parseFloat(num2));
        console.log(`Calculation result: ${result}`); // Log result
        currentDisplayValue = result.toString();
        updateDisplay();

        // Reset for the next calculation
        num1 = currentDisplayValue;
        num2 = "";
        operator = "";
    } else {
        console.log("Incomplete operation");
    }
});

// Handle the clear button click
clearButton.addEventListener("click", () => {
    num1 = "";
    num2 = "";
    operator = "";
    currentDisplayValue = "";
    isOperatorSelected = false; // Reset operator selection
    updateDisplay(); // Reset display to "0"
});

