
	// Define all variable
	// '$' prefix denotes a jquery object
	var $calculator;
	var $buttons;
	var $display;
	var currentValue = 0;
	var currentOperator = "";
	var currentInput = "";
	var lastInput = "";
	var operators = [ "+", "-", "*", "/" ];
	var lastPress = "";
	var hasOperated = false;
	var hasInput = false;
	var hasCalculated = false;

	// Wait for the document to be parsed and rendered before acting
	$(document).ready(function() {
		// Cache reused jquery objects
		$calculator = $(".calculator");
		$buttons = $(".button");
		$display = $(".display");

		// Bind events
		$calculator.on("click", ".button", onButtonClick);

		// Kick it off with a clean reset
		reset();
	});

	// Handles clicks to buttons
	function onButtonClick(event) {
		// Cache target button and it's values
		var $target = $(event.target);
		var buttonValue = $target.text().toLowerCase();
		var buttonCharCode = buttonValue.charCodeAt(0);

		// Replace operator's special charachter with a real operation
		if (buttonCharCode === 247) {
			buttonValue = "/";
		} else if (buttonCharCode === 215) {
			buttonValue = "*";
		}

		// Delegate button action
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

	// Handles resetting application state
	function reset() {
		currentValue = 0;
		currentOperator = "";
		currentInput = "";
		lastInput = "";
		lastPress = "";
		hasOperated = false;
		hasInput = false;
		hasCalculated = false;

		// Don't forget to update the value!
		updateDisplay(currentValue);
	}

	// Handle digit press
	function appendInput(input) {
		// If we've already pressed the decumal, simply return
		if (input === "." && currentInput.indexOf(".") > -1) {
			return;
		}

		// If the last press was an operator, we need to clear
		// Otherwise it's part of the current input
		if (lastPress === "operator") {
			currentInput = input;
		} else {
			currentInput += input;
		}

		// Make sure we don't have any leading 0's on whole numbers
		if (currentInput.length > 1 && currentInput.slice(0, 1) === "0" && currentInput.slice(1, 1) !== ".") {
			currentInput = currentInput.slice(1, currentInput.length);
		}

		// Make sure we do have a leading 0 on decimals
		if (currentInput.slice(0, 1) === ".") {
			currentInput = "0" + currentInput;
		}

		// Update application state
		lastPress = "digit";
		hasInput = true;
		hasCalculated = false;

		// Don't forget to update the value!
		updateDisplay(currentInput);
	}

	// Handle operator press
	function setOperator(operator) {
		// We need to calculate if there's already been input-operator-input
		if (hasOperated && lastPress !== "operator") {
			calculateValue();
		}

		// Set operator
		currentOperator = operator;
		currentValue = parseFloat(currentInput);

		// Make sure we have a valid number
		if (isNaN(currentValue)) {
			currentValue = 0;
		}

		// Update application state
		lastPress = "operator";
		hasOperated = true;
		hasInput = false;
		hasCalculated = false;
	}

	// Handle the actual calculation
	function calculateValue() {
		var input;

		// If we've already calculated and they keep hitting enter we don't want the output to square it'self
		// Rather it should continue adding the last input value to the new total
		if (hasCalculated) {
			input = parseFloat(lastInput);
		} else {
			input = parseFloat(currentInput);
			lastInput = input;
		}

		// Do the calculation
		switch (currentOperator) {
			case "+":
				currentValue += input;
				break;
			case "-":
				currentValue -= input;
				break;
			case "*":
				currentValue *= input;
				break;
			case "/":
				currentValue /= input;
				break;
			default:
				break;
		}

		// Update application state
		lastPress = "operator";
		hasInput = false;
		hasCalculated = true;

		// Don't forget to update the value!
		updateDisplay(currentValue);
		currentInput = currentValue.toString();
	}

	// Handle updating our display
	function updateDisplay(value) {
		$display.val(value);
	}