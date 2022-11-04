import React, { useState } from "react";
import { randomFunction } from "./Random";
import Props from "./Props";
import "./Css.css"

// interface IParticipantsDetails {
//   PlayerId : String,
//   PlayerValue : number,
//   icon : String
// }

// interface IArrobject{
//   id : any,
//   ladder : String,
//   snake : String
// }

let winner = ""
let participantsDetails:any = []
let playerArray:any = []
let numberOfPlayers = Number(prompt("Enter The Number Of Players"))
let diceOutput = 0
let k = 0
let count = -1
let playerObject :any = {}
let emptobj:any = {}
let coins = ["😃", "💗", "🧑", "👩‍🦰", "🤦‍♀️", "🌹"]
let visibility = "invisible"
let startGame = false

for (let i = 1; i <= numberOfPlayers; i++) {
  participantsDetails.push({ [`PlayerId`]: `Player ${i}` })
  participantsDetails[i - 1]["PlayerValue"] = 0
  participantsDetails[i - 1]["icon"] = coins[i - 1]
  playerArray.push([])
  playerObject[`Player ${i}`] = 0
}
export const FinalApp = () => {
  inputFunction()

  function inputFunction() {
    if (numberOfPlayers <= 6 && numberOfPlayers > 0) {
        visibility = "invisible"
        startGame = true
    } else {
        alert("Enter maximum 6 players")
        restartFunction()
    }
    return numberOfPlayers
  }

  function turnCondition() {
    if (k === numberOfPlayers) {
      k = 0
    }
  }
  if (count === numberOfPlayers) {
    count = 0
  }

  turnCondition()

  const [playerturn, setPlayerturn] = useState('Player 1');
  const [playerPosition, setPlayerposition] = useState(participantsDetails[k].PlayerValue);
  const [lop, setLop] = useState<any>(playerObject)
  const [finalwinner, setFinalwinner] = useState('visible');


  let snakesFrom = [37, 65, 70, 81];
  let snakesTo = [18, 36, 54, 77];
  let ladderFrom = [9, 25, 41, 74];
  let ladderTo = [30, 44, 62, 95];

  let arr: any = []
  for (let i = 100; i >= 1; i -= 10) {
    if (i % 20 === 0) {
      for (let j = i; j > (i - 10); j--) {
        obstaclesfunction(j)
      }
    }

    else {
      for (let j = (i - 9); j <= i; j++) {
        obstaclesfunction(j)
      }
    }
  }

  function obstaclesfunction(x:number) {

    if (ladderFrom.includes(x)) {
      arr.push({id:x, ladder: '🐱‍🏍', toladder : `(🐱‍🏍 ⬆ ${ladderTo[ladderFrom.indexOf(x)]})`})
    }
    else if (snakesFrom.includes(x)) {
      arr.push({ id: x, snake: '🐍' , tosnake : `(🐍 ⬇ ${snakesTo[snakesFrom.indexOf(x)]})`})
    }
    else {
      arr.push({ id: x, ladder: 'empt', snake: 'empt' })
    }
  }

  function turnFunction() {
    if (playerturn === participantsDetails[k].PlayerId) {
      positioningFunction()
      if (k < numberOfPlayers - 1) {
        setPlayerturn(participantsDetails[k + 1].PlayerId)
      } else {
        turnCondition()
        setPlayerturn(participantsDetails[k].PlayerId)
      }
    }

    else {
      if (k > numberOfPlayers - 1) {
        turnCondition()
        setPlayerturn(participantsDetails[k].PlayerId)
      } else {
        setPlayerturn(participantsDetails[k + 1].PlayerId)
      }
      positioningFunction()
    }
    k++
    count++
  }

  function positioningFunction() {
    emptobj = playerObject
    diceOutput = randomFunction()
    let tempplayerposition = participantsDetails[k].PlayerValue
    participantsDetails[k].PlayerValue += diceOutput
    playerArray[k].push(tempplayerposition)
    setPlayerposition(participantsDetails[k].PlayerValue)

    if (participantsDetails[k].PlayerValue < 100) {

      if (ladderFrom.includes(participantsDetails[k].PlayerValue)) {
        participantsDetails[k].PlayerValue = (ladderTo[ladderFrom.indexOf(participantsDetails[k].PlayerValue)]);
        setPlayerposition(participantsDetails[k].PlayerValue);
      }
      else if (snakesFrom.includes(participantsDetails[k].PlayerValue)) {
        participantsDetails[k].PlayerValue = (snakesTo[snakesFrom.indexOf(participantsDetails[k].PlayerValue)]);
        setPlayerposition(participantsDetails[k].PlayerValue);
      }

      else {
        setPlayerposition(participantsDetails[k].PlayerValue);
      }

    }

    else if (participantsDetails[k].PlayerValue === 100) {
      alert(`${participantsDetails[k].PlayerId} is winner`)
      alert(`Player History : ${playerArray[k]}`)
      setFinalwinner('invisible')
      setPlayerposition(tempplayerposition)
    }

    else {
      participantsDetails[k].PlayerValue = tempplayerposition
      setPlayerposition(tempplayerposition)
    }
    playerObject[participantsDetails[k].PlayerId] = Number(participantsDetails[k].PlayerValue)
    setLop((lop: any) => ({ ...lop, ...emptobj }))
  }

  function playerpositionprops(x:number) {
    let emptArr = []
    if (count >= 0) {
      for (let j in lop) {
        if (x.toString() === lop[j].toString()) {
          emptArr.push(<h3>{j}</h3>)
        }
      }
      return emptArr
    }
  }

  function restartFunction() {
    window.location.reload()
  }

  return (
    <div>
      <div>
        <div className="main">
          <header>
            <div className="snakeimg" id="snakeimg"> <img src="C:\Users\VIJAY\Desktop\snakeandladder-ts\src\Dice IMG.png" alt="" /></div>
            <h1 className="title">Snake n Ladder</h1>
            <div>
              <h4>{winner}</h4>
              <button onClick={turnFunction} id="display" className={finalwinner}><h1 id="diceimg">🎲</h1></button>
            </div>
            <br />
            <h4 className="playerpositionid">NEXT-TURN : {playerturn}</h4>
            <h4 className="playerpositionid"> Player Position : {playerPosition}</h4>
            <h4 className="diceOutputid"> Dice Output : {diceOutput} </h4>
            <button onClick={restartFunction} className="restart" > RESTART</button>
          </header>
          <div className="gameboard">
            <div className="tileGrid">{arr.map((empt: { toString: () => string | undefined; id: number; snake: string; tosnake:String | String; ladder: string; toladder:String | String; }) => <div className="table" id={empt.toString()}>
              <Props
                key={empt.id}
                celldata={empt.id}
                playerPosition={playerpositionprops(empt.id)}
                snake={empt.snake === "🐍" ? empt.tosnake : " "}
                ladder={empt.ladder === "🐱‍🏍" ? empt.toladder : " "} 
                winner={""} />
            </div>)}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FinalApp;
