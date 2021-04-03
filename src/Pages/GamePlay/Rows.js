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
  rows,
  eatenFood,
  setEatenFood,
  clickedArray,
  setClickedArray,
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
          rows={rows}
          eatenFood={eatenFood}
          setEatenFood={setEatenFood}
          clickedArray={clickedArray}
          setClickedArray={setClickedArray}
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
