import React  from "react"


const Winner = props=> {

	return (
		<div id="winner">
		{!props.announcement ? <h1>Press Button To Start!</h1> : <h1>{props.announcement} {props.countDown }</h1>}
	

		</div>
	)
}

export default Winner 