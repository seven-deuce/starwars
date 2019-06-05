import React from "react"

const Game = props => {

	return (
		<div className="container">
			<div className="rocket">
			<h1>Luke</h1>
			</div>
			<div id="startBtn">
			{!props.done ? <h2 onClick={props.game}>New Game</h2> : 
			<h2 onClick={props.reload}>Reload...</h2> }
			</div>

			<div className="rocket">
			<h1>Han</h1>
			</div>

		</div>
	)
}

export default Game 