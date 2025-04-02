import React, { useEffect, useState } from "react";

import { KEYBOARD_KEYS } from "../../constants";
import { checkGuess } from "../../game-helpers";

function Keyboard({ words, answer }) {
	const [guesses, setGuesses] = useState([]);
	const [keyStates, setKeyStates] = useState({});

	useEffect(() => {
		const handleKeyPress = (event) => {
			if (event.key === "Enter") {
				// Handle the Enter key press
			} else if (event.key === "Backspace") {
				// Handle the Backspace key press
			} else if (KEYBOARD_KEYS.includes(event.key.toUpperCase())) {
				// Handle letter key press
			}
		};

		window.addEventListener("keydown", handleKeyPress);

		return () => {
			window.removeEventListener("keydown", handleKeyPress);
		};
	}, []);

	useEffect(() => {
		// Retrieve only completed guesses from the words array
		const completedGuesses = words.filter((word) => word !== "     ");
		setGuesses(completedGuesses);
	}, [words]);

	useEffect(() => {
		// Create a variable to store the new key states
		const newKeyStatuses = {};

		guesses.forEach((guess) => {
			// Get the result of checkGuess for the current guess
			const result = checkGuess(guess, answer);

			result.forEach(({ letter, status }) => {
				// Update the state ONLY if it's not already "correct"
				if (!newKeyStatuses[letter] || newKeyStatuses[letter] !== "correct") {
					newKeyStatuses[letter] = status;
				}
			});
		});

		setKeyStates(newKeyStatuses);
	}, [guesses, answer]);

	return (
		<div className="keyboard">
			{KEYBOARD_KEYS.map((row, i) => {
				return (
					<span key={i}>
						{row.split("").map((key) => {
							const state = keyStates[key] || "";
							return (
								<span key={key} className={state ? state : undefined}>
									{key}
								</span>
							);
						})}
					</span>
				);
			})}
		</div>
	);
}

export default Keyboard;
