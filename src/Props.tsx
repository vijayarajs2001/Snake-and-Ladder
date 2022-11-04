import React from 'react'
type IProps = {
  key : number,
  celldata: number,
  snake: String,
  ladder: String,
  playerPosition: any,
  winner: String
}
const Props = ({ celldata, snake, ladder, playerPosition, winner }: IProps) => {
  return (
    <div>
      <h1>{celldata}</h1>
      <h1>{snake}</h1>
      <h1>{ladder}</h1>
      <h1>{winner}</h1>
      <p>{playerPosition}</p>
    </div>
  )
}

export default Props;