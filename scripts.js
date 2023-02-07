let shouldResetScreen = false;

const numberButtons = document.querySelectorAll("[data-number]");
const currentOperationScreen = document.getElementById(
  "currentOperationScreen"
);

numberButtons.forEach((button) => {
  button.addEventListener("click", () => appendNumber(button.textContent));
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
