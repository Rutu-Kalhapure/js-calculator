let input = document.getElementById("input");
let number = document.querySelectorAll(".number");
let operator = document.querySelectorAll(".operator");
let result = document.getElementById("result");
let allClear = document.getElementById("allClear");
let del = document.getElementById("del");
let resultDisplayed = false; // flag to keep an eye on what output is displayed

// Adding Click Handlers to Number Buttons
number.forEach((numButton) => {
  numButton.addEventListener("click", (e) => {
    let currentString = input.value;
    let lastChar = currentString[currentString.length - 1];
    if (resultDisplayed === false) {
      input.value += e.target.innerHTML;
    } else if (resultDisplayed === true && "+-*/".includes(lastChar)) {
      resultDisplayed = false;
      input.value += e.target.innerHTML;
    } else {
      resultDisplayed = false;
      input.value = "";
      input.value += e.target.innerHTML;
    }
  });
});

// Adding Click Handlers to Operator Buttons
operator.forEach((operatorBtn) => {
  operatorBtn.addEventListener("click", (e) => {
    let currentString = input.value;
    let lastChar = currentString[currentString.length - 1];
    if ("+-*/".includes(lastChar)) {
      input.value = currentString.slice(0, -1) + e.target.innerHTML;
    } else if (currentString.length === 0) {
      console.log("Enter first number");
    } else {
      input.value += e.target.innerHTML;
    }
  });
});

// Equal Button Functionality
result.addEventListener("click", function () {
  let inputString = input.value;

  // Split the input string into numbers and operators
  let numbers = inputString
    .split(/\+|\-|\*|\/|\%/g)
    .map((num) => parseFloat(num));
  let operators = inputString.replace(/[0-9]|\./g, "").split("");

  // Handle percentage conversions
  let percentage = operators.indexOf("%");
  while (percentage != -1) {
    let num = numbers[percentage];
    if (isNaN(num)) {
      console.error("Invalid number detected in the percentage conversion");
      break;
    }
    numbers[percentage] = num / 100;
    operators.splice(percentage, 1);
    percentage = operators.indexOf("%");
  }

  // Handle divisions
  let divide = operators.indexOf("/");
  while (divide != -1) {
    let num1 = numbers[divide];
    let num2 = numbers[divide + 1];
    if (isNaN(num1) || isNaN(num2)) {
      console.error("Invalid number detected in the division operation");
      break;
    }
    numbers.splice(divide, 2, num1 / num2);
    operators.splice(divide, 1);
    divide = operators.indexOf("/");
  }

  // Handle multiplications
  let multiply = operators.indexOf("*");
  while (multiply != -1) {
    let num1 = numbers[multiply];
    let num2 = numbers[multiply + 1];
    if (isNaN(num1) || isNaN(num2)) {
      console.error("Invalid number detected in the multiplication operation");
      break;
    }
    numbers.splice(multiply, 2, num1 * num2);
    operators.splice(multiply, 1);
    multiply = operators.indexOf("*");
  }

  // Handle subtractions
  let subtract = operators.indexOf("-");
  while (subtract != -1) {
    let num1 = numbers[subtract];
    let num2 = numbers[subtract + 1];
    if (isNaN(num1) || isNaN(num2)) {
      console.error("Invalid number detected in the subtraction operation");
      break;
    }
    numbers.splice(subtract, 2, num1 - num2);
    operators.splice(subtract, 1);
    subtract = operators.indexOf("-");
  }

  // Handle additions
  let add = operators.indexOf("+");
  while (add != -1) {
    let num1 = numbers[add];
    let num2 = numbers[add + 1];
    if (isNaN(num1) || isNaN(num2)) {
      console.error("Invalid number detected in the addition operation");
      break;
    }
    numbers.splice(add, 2, num1 + num2);
    operators.splice(add, 1);
    add = operators.indexOf("+");
  }

  input.value = numbers[0];
  resultDisplayed = true;
});

// Clear Button Functionality
allClear.addEventListener("click", function () {
  input.value = "";
});

// Delete Button Functionality
del.addEventListener("click", function () {
  var currentString = input.value;
  input.value = currentString.slice(0, -1);
});
