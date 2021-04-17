import React from "react";
import Food from "../Assets/food.png";
import Char from "../Assets/character2.png";

const BoardCell = ({
  id,
  contentArray,
  setContentArray,
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
  randomPlayerId,
  setRandomPlayerId,
  setInputValue,
}) => {
  // const [state, setState] = useState(Char);
  return (
    <div
      style={{
        width: 45,
        height: 40,
        lineHeight: 3.6,
        border: "1.234345px solid #853594",
        textAlign: "center",
      }}
      onClick={() => {
        const abs = Math.abs(id - randomPlayerId);

        if (contentArray.includes(id) && (abs === 1 || abs === rows)) {
          setEatenFood((prev) => prev + 1);
        }

        if (moves.remainingMoves <= 0 && eatenFood === rows) {
          setWin(() => true);
        }

        if (moves.maximumMoves - moves.totalMoves === 0) {
          setLost(true);
        }

        if (abs === 1 || abs === rows) {
          setMoves((prev) => ({
            ...prev,
            totalMoves: prev.totalMoves + 1,
          }));
          setRandomPlayerId(id);
          if (contentArray.includes(id)) {
            contentArray.splice(contentArray.indexOf(id), 1);
            setContentArray(contentArray);
          }
        }
      }}
    >
      {contentArray.includes(id) ? (
        <img style={{ width: 30, height: 30 }} src={Food} alt="Food" />
      ) : null}
      {!contentArray.includes(id) && id === randomPlayerId ? (
        <img style={{ width: 30, height: 30 }} src={Char} alt="Food" />
      ) : null}
    </div>
  );
};

export default BoardCell;
