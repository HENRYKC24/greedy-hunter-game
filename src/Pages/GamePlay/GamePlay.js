import React, { useState, useRef } from "react";
import BackgroundImage from "../../Assets/gamePlayBg.jpg";
import Styles from "./Styles.module.css";
import Life from "../../Assets/heart.png";
import LifeBarBackground from "../../Assets/live-track.png";
import LifeBar from "../../Assets/live.png";
import Rows from "./Rows";
import Counter, { Min, Sec } from "../../Components/Counter";
import randonNumbers from "../../Utilities/GenerateRandomNumbers";
import randonPlayer from "../../Utilities/RandomlyPlacePlayer";
import GameStart from "../GameStart/GameStart";

const GamePlay = ({ state, setInputValue }) => {
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
  const [randomPlayerId, setRandomPlayerId] = useState(0);

  const counter = useRef(<Counter />);
  if (noMore) {
    let array = randonNumbers(state.grid);
    let randomPlayerNumber = randonPlayer(state.grid, array);
    setContentArray(array);
    setRandomPlayerId(randomPlayerNumber);
    setNoMore(() => false);
  }

  const {
    board,
    life,
    topContainer,
    heart,
    lifeBar,
    lifeBack,
    grid,
    gridTimes,
  } = Styles;
  const Play = (
    <div
      style={{
        backgroundImage: `url(${BackgroundImage})`,
        backgroundAttachment: "initial",
        backgroundSize: "100% 100%",
        width: "100%",
        minHeight: 700,
        paddingTop: 30,
      }}
    >
      <div className={board}>
        <div className={topContainer}>
          <div className={gridTimes}>
            Grid:{" "}
            <span style={{ fontWeight: "bolder"}}>
              {state.grid}&nbsp;&times;&nbsp;{state.grid}
            </span>
          </div>

          {counter.current}
        </div>
        <div style={{  marginBottom: 40, paddingLeft: 70 }}>
          <img
            style={{ width: 150 }}
            className={`${life} ${lifeBack}`}
            src={LifeBarBackground}
            alt="Life bar background"
          />
          <img
            style={{
              width:
                ((moves.maximumMoves - moves.totalMoves) * 150) /
                moves.maximumMoves,
              height: 15,
            }}
            className={`${life} ${lifeBar}`}
            src={LifeBar}
            alt="Life bar"
          />
          <img className={`${life} ${heart}`} src={Life} alt="Life" />
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
            setContentArray={setContentArray}
            grid={grid}
            rows={state.grid}
            eatenFood={eatenFood}
            setEatenFood={setEatenFood}
            randomPlayerId={randomPlayerId}
            setRandomPlayerId={setRandomPlayerId}
            setInputValue={setInputValue}
          />
        </div>

        <div className={topContainer}>
          <div>
            Max moves:{" "}
            <span style={{ fontWeight: "bolder" }}>{moves.maximumMoves}</span>
          </div>

          <div>
            Moves:{" "}
            <span style={{ fontWeight: "bolder" }}>{moves.totalMoves}</span>
          </div>

          <div>
            Moves Left:{" "}
            <span style={{ fontWeight: "bolder" }}>
              {moves.maximumMoves - moves.totalMoves}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
  return moves.maximumMoves - moves.totalMoves !== 0 &&
    eatenFood !== Number(state.grid) ? (
    Play
  ) : eatenFood === Number(state.grid) ? (
    <GameStart
      state={{
        ...state,
        title: "Bravo!",
        text1: "Total Food: ",
        food: eatenFood,
        min1: Min.toString().length === 1 ? "0" : "",
        min2: Min,
        sec1: Sec.toString().length === 1 ? "0" : "",
        sec2: Sec,
        text2: "Time Spent: ",
        buttonText: "Start again",
        inputValue: state.grid,
        moves: moves,
      }}
    />
  ) : (
    <GameStart
      state={{
        ...state,
        title: "Game Over!",
        text1: "Total Food: ",
        food: eatenFood,
        min1: Min.toString().length === 1 ? "0" : "",
        min2: Min,
        sec1: Sec.toString().length === 1 ? "0" : "",
        sec2: Sec,
        text2: "Time Spent: ",
        buttonText: "Start again",
        inputValue: state.grid,
        moves: moves,
      }}
    />
  );
};

export default GamePlay;
