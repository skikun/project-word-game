import React, { useEffect, useState } from "react";

import { KEYBOARD_KEYS } from "../../constants";
import { checkGuess } from "../../game-helpers";

function Keyboard({ words, answer }) {
	const [guesses, setGuesses] = useState([]);

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
		console.log(completedGuesses, "completedGuesses");
		console.log(guesses, "guesses");
		console.log(words, "words");
	}, [words]);

	return (
		<div className="keyboard">
			{KEYBOARD_KEYS.map((row, i) => {
				return (
					<span key={i}>
						{row.split("").map((key) => {
							const className = checkGuess(guesses[0], answer);
							const { status } = className ? className : { status: "" };

							return (
								<span key={key} className={status}>
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
