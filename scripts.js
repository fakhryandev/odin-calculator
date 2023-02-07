let firstOperand = "";
let secondOperand = "";
let currentOperation = null;
let shouldResetScreen = false;

const numberButtons = document.querySelectorAll("[data-number]");
const operatorButtons = document.querySelectorAll("[data-operator]");
const lastOperationScreen = document.getElementById("lastOperationScreen");
const currentOperationScreen = document.getElementById(
  "currentOperationScreen"
);
const equalsButton = document.getElementById("equalsButton");

const evaluate = () => {
  if (currentOperation === null || shouldResetScreen) return;
  if (currentOperationScreen.textContent === "0" && currentOperation === "÷") {
    alert("You can't divide by 0");
    return;
  }
  secondOperand = currentOperationScreen.textContent;
  currentOperationScreen.textContent = operate(
    currentOperation,
    firstOperand,
    secondOperand
  );
  lastOperationScreen.textContent = `${firstOperand} ${currentOperation} ${secondOperand} =`;
  currentOperation = null;
};

equalsButton.addEventListener("click", evaluate);

numberButtons.forEach((button) => {
  button.addEventListener("click", () => appendNumber(button.textContent));
});

operatorButtons.forEach((button) => {
  button.addEventListener("click", () => setOperation(button.textContent));
});

const appendNumber = (number) => {
  if (currentOperationScreen.textContent == "0" || shouldResetScreen) {
    resetScreen();
  }

  currentOperationScreen.textContent += number;
};

const resetScreen = () => {
  currentOperationScreen.textContent = "";
  shouldResetScreen = false;
};

const setOperation = (operator) => {
  firstOperand = currentOperationScreen.textContent;
  currentOperation = operator;
  lastOperationScreen.textContent = `${firstOperand} ${currentOperation}`;
  shouldResetScreen = true;
};

const add = (a, b) => {
  return a + b;
};

const substract = (a, b) => {
  return a - b;
};

const multiply = (a, b) => {
  return a * b;
};

const divide = (a, b) => {
  return a / b;
};

const operate = (operator, a, b) => {
  a = Number(a);
  b = Number(b);
  switch (operator) {
    case "+":
      return add(a, b);
    case "-":
      return substract(a, b);
    case "×":
      return multiply(a, b);
    case "÷":
      if (b === 0) return null;
      else return divide(a, b);
    default:
      return null;
  }
};
