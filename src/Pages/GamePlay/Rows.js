import React from "react";
import BoardCell from "../../Components/BoardCell";

const Rows = ({
  moves,
  setMoves,
  win,
  setWin,
  lost,
  setLost,
  contentArray,
  setContentArray,
  rows,
  eatenFood,
  setEatenFood,
  clickedArray,
  setClickedArray,
  randomPlayerId,
  setRandomPlayerId,
  setInputValue,
}) => {
  const produceRows = (totalCells, rows) => {
    let totalRows = [];
    let singleRow = [];
    for (let i = 1; i <= totalCells; i += 1) {
      singleRow.push(
        <BoardCell
          key={i * i}
          id={i}
          moves={moves}
          win={win}
          setWin={setWin}
          lost={lost}
          setLost={setLost}
          setMoves={setMoves}
          contentArray={contentArray}
          setContentArray={setContentArray}
          rows={rows}
          eatenFood={eatenFood}
          setEatenFood={setEatenFood}
          clickedArray={clickedArray}
          setClickedArray={setClickedArray}
          randomPlayerId={randomPlayerId}
          setRandomPlayerId={setRandomPlayerId}
          setInputValue={setInputValue}
        />
      );
      if (i % rows === 0) {
        // console.log(singleRow);
        totalRows.push(<div key={i}>{singleRow}</div>);
        singleRow = [];
      }
    }
    return totalRows;
  };
  return produceRows(rows * rows, rows);
};

export default Rows;
