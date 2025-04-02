import React, { useEffect, useState } from "react";

import { range, sample } from "../../utils";
import { WORDS } from "../../data";

import Guesses from "../Guesses";
import Input from "../Input";
import Keyboard from "../Keyboard";

import { NUM_OF_GUESSES_ALLOWED } from "../../constants.js";

function Game() {
	// The answer state is initialized with a random word from the WORDS array.
	const [answer, setAnswer] = useState(sample(WORDS));

	// The list state is initialized with an array of empty
	// strings, with a length equal to the number of guesses allowed.
	const [list, setList] = useState(range(NUM_OF_GUESSES_ALLOWED).fill("     "));

	// To make debugging easier, we'll log the solution in the console.
	console.info({ answer });

	// The totalGuesses state is initialized to 0.
	const [currentGuess, setCurrentGuess] = useState(0);
	const [correctGuess, setCorrectGuess] = useState(1);

	const [bannerState, setBannerState] = useState("");

	async function handleSubmit(guess) {
		if (list.includes(guess)) {
			// If the guess is already in the list, display an alert
			alert("You have already guessed that word!");
			return;
		}

		if (guess === answer || currentGuess < NUM_OF_GUESSES_ALLOWED) {
			// If the guess is correct or the number of max num of guesses has not been reached, update the list with the new guess
			setList((prev) => {
				const newList = [...prev];
				newList[currentGuess] = guess;
				return newList;
			});
		}

		if (guess === answer) {
			// If the guess is correct, display an
			// alert and reset the current guess count
			setCurrentGuess(0);
			setCorrectGuess(currentGuess);
			setBannerState("happy");
			return;
		}

		if (currentGuess < NUM_OF_GUESSES_ALLOWED) {
			// If the guess was not correct, increment the current guess count
			setCurrentGuess((prev) => prev + 1);
		}

		if (currentGuess === NUM_OF_GUESSES_ALLOWED - 1) {
			// If the number of max num of guesses has been reached, display an alert
			setBannerState("sad");
		}
	}

	function resetGame() {
		// Reset the game when the user clicks "Play Again"
		setList(range(NUM_OF_GUESSES_ALLOWED).fill("     "));
		setCurrentGuess(0);
		setCorrectGuess(currentGuess);
		setBannerState("");
		setAnswer(sample(WORDS));
	}

	useEffect(() => {
		// Reset the game when the component mounts
		setList(range(NUM_OF_GUESSES_ALLOWED).fill("     "));
		setCurrentGuess(0);
		setCorrectGuess(currentGuess);
		setBannerState("");
		setAnswer(sample(WORDS));
	}, []);

	return (
		<>
			{bannerState && (
				<div className={`${bannerState} banner`}>
					{bannerState === "happy" ? (
						<>
							<p>
								<strong>Congratulations!</strong> Got it in{" "}
								<strong>
									{correctGuess + 1} {correctGuess < 2 ? "guess" : "guesses"}
								</strong>
								.
							</p>
							<br />
							<button onClick={() => resetGame()}>Play Again</button>
						</>
					) : (
						<>
							<p>
								Sorry, the correct answer is <strong>{answer}</strong>.
							</p>
							<br />
							<button onClick={() => resetGame()}>Try again</button>
						</>
					)}
				</div>
			)}
			<Input
				onSubmitGuess={(guess) => handleSubmit(guess)}
				blocked={
					currentGuess >= NUM_OF_GUESSES_ALLOWED || list.includes(answer)
				}
			/>
			<Guesses list={list} answer={answer} />
			<Keyboard words={list} answer={answer} />
		</>
	);
}

export default Game;
