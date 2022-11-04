import React from 'react'
import FinalApp from './App'
import './Finalcss.css'

let startGame = false
let visibility = "visible"
let numberOfPlayers:number = 0

function inputFunction() {
    if (numberOfPlayers <= 6 && numberOfPlayers > 0) {
        visibility = "invisible"
        startGame = true
    } else {
        alert("Enter maximum 6 players")
    }
    return numberOfPlayers
}
export default function UserInput() {

    return (
        <div>
            {/* <input type="number" className={visibility} onChange={(e) => { noOfPlayersFunc(e.target.value) }} click Here /> */}
            {/* <div><h1>{ }</h1></div> */}
            {/* <button onClick={input4Function} > Submit </button> */}
            {/* <p>Number Of Players : {inputFunction()} </p> */}
            {/* {inputFunction} */}
            {startGame ? <FinalApp /> : null}
        </div>
    )
}
export { numberOfPlayers }