import React from "react";

import Guess from "../Guess";

function Guesses({ list, answer }) {
	return (
		<div className="guess-results">
			{list.map((_, i) => (
				<Guess key={i} word={list[i]} answer={answer} />
			))}
		</div>
	);
}

export default Guesses;
