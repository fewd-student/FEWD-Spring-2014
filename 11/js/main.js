
	var $calculator,
		$buttons,
		$display,
		currentValue = 0,
		currentOperator = "",
		currentInput = "",
		lastPress = "";
		hasOperated = false,
		hasInput = false,
		operators = ["+","-","/","*"];

	$(document).ready(function() {
		$calculator = $(".calculator");
		$buttons = $(".button");
		$display = $(".display");

		$calculator.on("click", ".button", onButtonClick);

		reset();
	});

	function onButtonClick(e) {
		var $target = $(e.target),
			buttonValue = $target.text().toLowerCase();
			buttonCharCode = buttonValue.charCodeAt(0);

		// Replace divide
		if (buttonCharCode === 247) {
			buttonValue = "/";
		}
		// Replace multiply
		if (buttonCharCode === 215) {
			buttonValue = "*";
		}

		if (buttonValue === "c") {
			reset();
		} else if (buttonValue === "=") {
			calculateValue();
		} else if (operators.indexOf(buttonValue) > -1) {
			setOperator(buttonValue);
		} else {
			appendInput(buttonValue);
		}
	}

	function reset() {
		currentValue = 0;
		currentOperator = "";
		currentInput = "";
		lastPress = "";

		hasOperated = false;
		hasInput = false;

		updateDisplay(currentValue);
	}

	function appendInput(input) {
		if (lastPress === "operator") {
			currentInput = input;
		} else {
			currentInput += input;
		}

		if (currentInput.length > 1 && currentInput.slice(0, 1) === "0" && currentInput.slice(1, 1) !== ".") {
			currentInput = currentInput.slice(1, currentInput.length);
		}

		if (currentInput.slice(0, 1) === ".") {
			currentInput = "0" + currentInput;
		}

		lastPress = "digit";
		hasInput = true;

		updateDisplay(currentInput);
	}

	function setOperator(operator) {
		if (hasOperated && lastPress !== "operator") {
			calculateValue();
			hasOperated = false;
		}

		currentOperator = operator;
		currentValue = parseFloat(currentInput);

		if (isNaN(currentValue)) {
			currentValue = 0;
		}

		lastPress = "operator";
		hasOperated = true;
		hasInput = false;
	}

	function calculateValue() {
		var input = parseFloat(currentInput);

		switch (currentOperator) {
			case "+":
				currentValue += input;
				break;
			case "-":
				currentValue -= input;
				break;
			case "/":
				currentValue /= input;
				break;
			case "*":
				currentValue *= input;
				break;
			default:
				break;
		}

		lastPress = "operator";
		hasInput = false;

		updateDisplay(currentValue);
		currentInput = currentValue.toString();
	}

	function updateDisplay(value) {
		$display.val(value);
	}