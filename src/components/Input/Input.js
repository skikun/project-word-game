import React, { useState } from "react";

const REGEX_FORBIDDENT_CHARACTERS = /[^A-Z]/g;
const REGEX_MAX_LENGTH = /^.{5}$/;
const REGEX_LENGTH_TRIMMER = /^(.{1,5}).{0,}/;

function Input({ onSubmitGuess, blocked }) {
	// States to manage the guess input and its validity
	const [guess, setGuess] = useState("");
	const [isValid, setIsValid] = useState(false);

	function handleInput(e) {
		// Convert input to uppercase letters and store it in rawValue
		const rawValue = e.target.value.toUpperCase();

		// Remove any forbidden characters (anything that is not a letter) and store it in cleanValue
		const cleanValue = rawValue.replace(REGEX_FORBIDDENT_CHARACTERS, "");

		// Trim the value to a maximum of 5 characters and store it in trimmedValue
		const trimmedValue = cleanValue.replace(REGEX_LENGTH_TRIMMER, "$1");

		// Set the guess state to the trimmed value
		setGuess(trimmedValue);

		// Check if the trimmed value matches the regex for maximum length and update isValid state
		setIsValid(REGEX_MAX_LENGTH.test(trimmedValue));
	}

	function handleSubmit(e) {
		// Prevent default form submission behavior
		e.preventDefault();

		if (!isValid || blocked) {
			// If the guess is not valid or the game is blocked, display an alert and return
			return;
		} else {
			// If the guess is valid, reset the guess state to an empty string
			setGuess("");
		}

		// Log the guess to the console
		console.log({ guess: guess });

		onSubmitGuess(guess);
	}

	return (
		<form className="guess-input-wrapper" onSubmit={handleSubmit}>
			<label htmlFor="guess-input">Enter guess:</label>
			<input
				className="guess-input"
				id="guess-input"
				type="text"
				autoFocus
				onChange={handleInput}
				value={guess}
				required
				pattern="[A-Z]{5}"
				title="Please enter a 5-letter word."
				disabled={blocked}
				placeholder={blocked ? "Game Over!" : "Enter your guess..."}
			/>
		</form>
	);
}

export default Input;
