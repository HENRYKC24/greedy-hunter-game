import React from "react";
import Food from "../Assets/food.png";
import Char from "../Assets/character2.png";
import Styles from "./Styles.module.css";

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
  const { div, foodChar } = Styles;
  return (
    <div
      className={div}
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
        <img className={foodChar} src={Food} alt="Food" />
      ) : null}
      {!contentArray.includes(id) && id === randomPlayerId ? (
        <img className={foodChar} src={Char} alt="Character" />
      ) : null}
    </div>
  );
};

export default BoardCell;
