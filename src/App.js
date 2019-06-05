import React, { useState, useEffect } from 'react';
import Winner from "./components/winner"
import Rounds from "./components/rounds"
import Game from "./components/game"
import Theme from "./audio/theme.mp3"

// I usually write small pure functions and avoid putting everything in one big function
// however, in this exercise I decided to put most of the code inside gamePlay() 
// function, so you can quickly read the code in a straight manner


const App = () => {

   const [ ships, setShips ] = useState( null )
   const [ announcement, setAnnouncement ] = useState( null )
   const [ lukeFeed, setLukeFeed ] = useState( null )
   const [ hanFeed, setHanFeed ] = useState( null )
   const [ round, setRound ] = useState( 0 )
   const [ countDown, setCountDown ] = useState( 3 )
   const [ done, setDone ] = useState( false )

   useEffect( () => {
      return setShips( getDataRecursively() )
   }, [] )

   const getDataRecursively = () => {
      let data = []
      const fetchAPI = "https://swapi.co/api/starships/"
      const fetcher = url => {
         fetch( url )
            .then( res => res.json() )
            .then( res => {
               res.results.forEach( item => {
                  // sorting out available values and converting them into Number type
                  const speed = item[ "max_atmosphering_speed" ].match( /\d+/g )
                  if ( speed ) data.push( {
                     speed: Number( speed[ 0 ] ),
                     ship: item.name
                  } )
               } )
               if ( res.next ) fetcher( res.next )
            } )
            .catch( err => setAnnouncement( "ERROR: The server is not available!" ) )
         return data
      }
      return fetcher( fetchAPI )
   }

   const reset = () => {
      setCountDown( 3 )
      setRound( 0 )
      setDone( false )
      setAnnouncement( null )
      document.getElementById( "audioPlayer" ).pause()
   }

   const gamePlay = () => {
      //ignore request when game is already underway: 
      if ( round !== 0 || countDown !== 3 ) return

      // preparing data needed from the game: 
      const randomizedData = ships.sort( () => Math.random() - .5 )
      const luke = randomizedData.slice( 0, 3 )
      const han = randomizedData.slice( 3, 6 )
      const lukeTotal = luke.reduce( ( a, b ) => a + b.speed, 0 )
      const hanTotal = han.reduce( ( a, b ) => a + b.speed, 0 )
      let winner;
      if ( lukeTotal > hanTotal ) winner = "The Winner is Luke"
      else if ( lukeTotal < hanTotal ) winner = "The Winner is Han"
      else winner = "No winner! It was a tie."

      setLukeFeed( luke )
      setHanFeed( han )

      setAnnouncement( "Next round starts at " )
      document.getElementById( "audioPlayer" ).currentTime = 0
      document.getElementById( "audioPlayer" ).play()
      // run game in intervals and update states:
      countDownFn( winner )
   }
   const countDownFn = ( winner ) => {
      const interval = setInterval( () => {
         setCountDown( preState => {
            if ( preState > 0 ) return preState - 1
            else if ( preState === 0 ) {
               setRound( oldRound => {
                  if ( oldRound < 2 ) return oldRound + 1
                  else {
                     clearInterval( interval )
                     setAnnouncement( winner )
                     setCountDown( null )
                     setRound( 3 )
                     setDone( true )
                     return
                  }
               } )
               setCountDown( 3 )
            }
         } )
      }, 1000 )
   }

   return (
			<React.Fragment>
					<Winner announcement={announcement} countDown={countDown} />
					<div className="container" id="roundsResult" >
							<Rounds  results={lukeFeed} round={round } />
							<Rounds results={hanFeed} round={round} />
					</div>
					<Game game={gamePlay} done={done} reload={reset}/>
					<audio id="audioPlayer" src={Theme}  />
			</React.Fragment>
   )
}

export default App;