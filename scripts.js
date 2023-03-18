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
const pointButton = document.getElementById("pointButton");
const clearButton = document.getElementById("clearButton");
const deleteButton = document.getElementById("deleteButton");

const evaluate = () => {
  if (currentOperation === null || shouldResetScreen) return;
  if (currentOperationScreen.textContent === "0" && currentOperation === "÷") {
    alert("You can't divide by 0");
    return;
  }
  secondOperand = currentOperationScreen.textContent;
  const result = operate(
    currentOperation,
    firstOperand,
    secondOperand
  ).toString();
  currentOperationScreen.textContent = result.slice(0, result.indexOf(".") + 3);
  lastOperationScreen.textContent = `${firstOperand} ${currentOperation} ${secondOperand} =`;
  currentOperation = null;
};

const appendPoint = () => {
  if (shouldResetScreen) resetScreen();
  if (currentOperationScreen.textContent === "")
    currentOperationScreen.textContent = "0";
  if (currentOperationScreen.textContent.includes(".")) return;
  currentOperationScreen.textContent += ".";
};

const clear = () => {
  currentOperationScreen.textContent = "0";
  lastOperationScreen.textContent = "";
  firstOperand = "";
  secondOperand = "";
  currentOperation = null;
};

const deleteNumber = () => {
  currentOperationScreen.textContent = currentOperationScreen.textContent
    .toString()
    .slice(0, -1);
};

const handleKeyboadInput = (e) => {
  if (e.key >= 0 && e.key <= 9) appendNumber(e.key);
  if (e.key === ".") appendPoint();
  if (e.key === "=" || e.key === "Enter") evaluate();
  if (e.key === "Backspace") deleteNumber();
  if (e.key === "Escape") clear();
  if (e.key === "+" || e.key === "-" || e.key === "*" || e.key === "/")
    setOperation(convertOperator(e.key));
};

window.addEventListener("keydown", handleKeyboadInput);
equalsButton.addEventListener("click", evaluate);
pointButton.addEventListener("click", appendPoint);
clearButton.addEventListener("click", clear);
deleteButton.addEventListener("click", deleteNumber);

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
  if (currentOperation !== null) evaluate();
  firstOperand = currentOperationScreen.textContent;
  currentOperation = operator;
  lastOperationScreen.textContent = `${firstOperand} ${currentOperation}`;
  shouldResetScreen = true;
};

const convertOperator = (keyboardOperator) => {
  if (keyboardOperator === "/") return "÷";
  if (keyboardOperator === "*") return "×";
  if (keyboardOperator === "-") return "−";
  if (keyboardOperator === "+") return "+";
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
