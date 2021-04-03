import React, { useState } from "react";
import Food from "../Assets/food.png";
import Char from "../Assets/character.png";

const BoardCell = ({
  id,
  contentArray,
  setMoves,
  moves,
  lost,
  win,
  setLost,
  setWin,
  rows,
  eatenFood,
  setEatenFood,
  clickedArray,
  setClickedArray,
}) => {
  const [state, setState] = useState(3);
  return (
    <div
      style={{
        width: 56,
        height: 50,
        lineHeight: 4,
        border: "1.234345px solid #853594",
        textAlign: "center",
      }}
      onClick={() => {
        if (contentArray.includes(id)) {
          setState(() => 1);
          setEatenFood(prev => prev + 1);
        } else {
          setState(() => 2);
        }
        
        if(moves.remainingMoves === 0 && eatenFood !== rows) {
          setLost(() => true);
        }
        if(moves.remainingMoves <= 0 && eatenFood === rows) {
          setWin(() => true);
        }
        if(!clickedArray.includes(id)) {
          setClickedArray(prev => {
            return [...prev, id];
          });
          setMoves((prev) => ({
            ...prev,
            totalMoves: prev.totalMoves + 1,
          }));
        }
      }}
    >
      {state === 1 ? (
        <img
          style={{ width: 30, height: 30 }}
          src={Food}
          alt="Food"
        />
      ) : null}
      {state === 2 ? (
        <img
          style={{ width: 30, height: 30 }}
          src={Char}
          alt="Character"
        />
      ) : null}
    </div>
  );
};

export default BoardCell;
