import React, { useState, useRef } from "react";
import BackgroundImage from "../../Assets/gamePlayBg.jpg";
import Styles from "./Styles.module.css";
import Life from "../../Assets/heart.png";
import LifeBarBackground from "../../Assets/live-track.png";
import LifeBar from "../../Assets/live.png";
import Rows from "./Rows";
import Counter, {Min, Sec} from "../../Components/Counter";
import randonNumbers from "../../Utilities/GenerateRandomNumbers";
import GameStart from "../GameStart/GameStart";

const GamePlay = ({ state, setState }) => {
  const [moves, setMoves] = useState({
    maximumMoves: Math.round((state.grid * state.grid) / 2),
    totalMoves: 0,
  });
  const [lost, setLost] = useState(false);
  const [win, setWin] = useState(false);
  const [eatenFood, setEatenFood] = useState(0);
  const [clickedArray, setClickedArray] = useState([]);
  const [noMore, setNoMore] = useState(true);
  const [contentArray, setContentArray] = useState([]);
  const counter = useRef(<Counter />);
  if (noMore) {
    let array = randonNumbers(state.grid);
    setContentArray(array);
    setNoMore(() => false);
  }

  const { board, life, topContainer, heart, lifeBar, lifeBack, grid } = Styles;
  // console.log(moves, eatenFood);
  const Play = (
    <div
      style={{
        backgroundImage: `url(${BackgroundImage})`,
        backgroundAttachment: "fixed",
        backgroundSize: "100% 100%",
        width: "100%",
        minHeight: 1000,
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
          {counter.current}
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
            <span style={{ fontWeight: "bolder" }}>{moves.maximumMoves}</span>
          </div>

          <div>
            Total moves:{" "}
            <span style={{ fontWeight: "bolder" }}>{moves.totalMoves}</span>
          </div>

          <div>
            Remaining moves:{" "}
            <span style={{ fontWeight: "bolder" }}>
              {moves.maximumMoves - moves.totalMoves}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
  console.log("loosing: ", lost, "Eaten: ", eatenFood, Number(state.grid));
  return moves.maximumMoves - moves.totalMoves !== 0 && eatenFood !== Number(state.grid) ? (
    Play
  ) : eatenFood === Number(state.grid) ? <GameStart state={{
        ...state,
        title: "Bravo!",
        text1: "Total Food: ",
        food: eatenFood,
        min1: Min.toString().length === 1 ? '0' : '',
        min2: Min,
        sec1: Sec.toString().length === 1 ? '0' : '',
        sec2: Sec,
        text2: "Time Spent: ",
        buttonText: "Start again",
        inputValue: state.grid,
      }} /> : ( 
    <GameStart
      state={{
        ...state,
        title: "Game Over!",
        text1: "Total Food: ",
        food: eatenFood,
        min1: Min.toString().length === 1 ? '0' : '',
        min2: Min,
        sec1: Sec.toString().length === 1 ? '0' : '',
        sec2: Sec,
        text2: "Time Spent: ",
        buttonText: "Start again",
        inputValue: state.grid,
      }}
    />
  );
};

export default GamePlay;
