import React, { useState } from "react";
import BackgroundImage from "../../Assets/gamePlayBg.jpg";
import Styles from "./Styles.module.css";
import Life from "../../Assets/heart.png";
import LifeBarBackground from "../../Assets/live-track.png";
import LifeBar from "../../Assets/live.png";
import Rows from "./Rows";
import Counter from "../../Components/Counter";
import randonNumbers from "../../Utilities/GenerateRandomNumbers";

const GamePlay = ({state}) => {
  const [moves, setMoves] = useState({
    maximuMoves: Math.round((state.grid * state.grid) / 2),
    totalMoves: 0,
  });
  const [lost, setLost] = useState(false);
  const [win, setWin] = useState(false);
  const [eatenFood, setEatenFood] = useState(0);
  const [clickedArray, setClickedArray] = useState([]);
  const [noMore, setNoMore] = useState(true);
  const [contentArray, setContentArray] = useState([]);


  if (noMore) {
    let array = randonNumbers(state.grid);
    setContentArray(array);
    setNoMore(() => false);
  }

  const { board, life, topContainer, heart, lifeBar, lifeBack, grid } = Styles;

  return (
    <div
      style={{
        backgroundImage: `url(${BackgroundImage})`,
        backgroundAttachment: "fixed",
        backgroundSize: "100% 100%",
        width: "100%",
        height: "100%",
        paddingTop: 100,
        paddingBottom: 100,
      }}
    >
      <div className={board}>
        <div className={topContainer}>
          <div>
            Grid:{" "}
            <span style={{ fontWeight: "bolder" }}>
              {state.grid} &times; {state.grid}
            </span>
          </div>
          <div>
            <img
              className={`${life} ${lifeBack}`}
              src={LifeBarBackground}
              alt="Life bar background"
            />
            <img
              className={`${life} ${lifeBar}`}
              src={LifeBar}
              alt="Life bar"
            />
            <img className={`${life} ${heart}`} src={Life} alt="Life" />
          </div>
          <Counter />
        </div>

        <div className={grid}>
          <Rows
            clickedArray={clickedArray}
            setClickedArray={setClickedArray}
            moves={moves}
            lost={lost}
            setLost={setLost}
            win={win}
            setWin={setWin}
            setMoves={setMoves}
            contentArray={contentArray}
            grid={grid}
            rows={state.grid}
            eatenFood={eatenFood}
            setEatenFood={setEatenFood}
          />
        </div>

        <div className={topContainer}>
          <div>
            Maximum moves:{" "}
            <span style={{ fontWeight: "bolder" }}>{moves.maximuMoves}</span>
          </div>

          <div>
            Total moves:{" "}
            <span style={{ fontWeight: "bolder" }}>{moves.totalMoves}</span>
          </div>

          <div>
            Remaining moves:{" "}
            <span style={{ fontWeight: "bolder" }}>
              {moves.maximuMoves - moves.totalMoves}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GamePlay;
