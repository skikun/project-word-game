import React from "react";

import { checkGuess } from "../../game-helpers";
import { range } from "../../utils";

function Guess({ word, answer }) {
	// If the word is empty, return an empty paragraph
	if (word === "     ") {
		return (
			<p className="guess">
				{range(5).map((_, i) => {
					return <span key={i} className="cell" />;
				})}
			</p>
		);
	}

	// If the word is not empty, map through each letter in the word and check its status
	return (
		<p className="guess">
			{word.split("").map((letter, index) => {
				// Save the status of the letter in a const
				const className = checkGuess(word, answer)[index].status;
				return (
					<span key={index} className={`cell ${className}`}>
						{letter}
					</span>
				);
			})}
		</p>
	);
}

export default Guess;
