import React from "react"

const Rounds = props=> {
// console.log(props.round)
	return (
		<div>
			{(props.round  > 0 && props.results ) ?  <h3>Round 1: {props.results[0].ship} - speed: {props.results[0].speed}</h3> : null}
				{(props.round  > 1 && props.results ) ?  <h3>Round 2: {props.results[1].ship} - speed: {props.results[1].speed}</h3> : null}
				{(props.round > 2  && props.results) ?  <h3>Round 3: {props.results[2].ship} - speed: {props.results[2].speed}</h3> : null}
			

		</div>
	)
}

export default Rounds 