import React, { useState } from "react";
import SideImage from "../../Assets/sideGrid.png";
import Character from "../../Assets/character.png";
import Styles from "./Styles.module.css";
import GamePlay from "../GamePlay/GamePlay";
import Up from "../../Assets/up.png";
import Down from "../../Assets/down.png";

const GameStart = ({ state }) => {
  const [inputValue, setInputValue] = useState(state.grid);
  const [start, setStart] = useState(false);
  const {
    container,
    char,
    title,
    middle,
    text1,
    text2,
    gameGrid,
    input,
    button,
    gridContainer,
    btns,
    btnUp,
    btnDown,
    sideImage,
  } = Styles;

  const handleChange = (e) => {
    if(Number(e.target.value) < 5 && !isNaN(parseInt(e.target.value))) {
      setInputValue(5);
    }
    if(parseInt(e.target.value, 10) > 12 || parseInt(e.target.value < 5)) {
      setInputValue(inputValue);
    }
  };

  const handleIncrease = (param) => {
    if (param < 12) {
      setInputValue(param + 1);
    }
  };

  const handleDecrease = (param) => {
    if (param > 5) {
      setInputValue(param - 1);
    }
  };

  const { food, grid } = state;
  
  const GameStart = (
    <div className={container}>
      <img className={sideImage} src={SideImage} alt="Side grid" />

      

      <div className={middle}>
        <img className={char} src={Character} alt="character" />
        <div className={title}>{state.title}</div>

        <div className={text1}>
          {state.text1} {food && food + '/' + grid}
        </div>
        <div className={text2}>
          {state.text2}
          {state.sec2 || state.sec1 || state.min1 || state.min2
            ? state.min1 + state.min2 + ":" + state.sec1 + state.sec2
            : null}
        </div>
        <div className={text2}>
          {state.moves
            ? "Moves: " +
              state.moves.totalMoves +
              "/" +
              state.moves.maximumMoves
            : null}
        </div>
        <div
          className={gridContainer}
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <div className={gameGrid}>Game grid</div>

         
          <div className="quantity">
            <input
              onChange={handleChange}
              className={input}
              type="number"
              min="5"
              max="12"
              value={inputValue}
              onFocus={() => false}
            />
            <div className={btns}>
              <div>
                <img
                  onClick={() => {
                    handleIncrease(inputValue);
                  }}
                  className={btnUp}
                  src={Up}
                  alt="up"
                />
              </div>
              <div>
                <img
                  onClick={() => {
                    handleDecrease(inputValue);
                  }}
                  className={btnDown}
                  src={Down}
                  alt="down"
                />
              </div>
            </div>
          </div>
        </div>
        <button
          onClick={() => {
            setStart(true);
          }}
          className={button}
        >
          {state.buttonText}
        </button>
      </div>

      <img className={sideImage} src={SideImage} alt="Side grid" />
    </div>
  );

  return start ? (
    <GamePlay
      state={{ ...state, grid: inputValue }}
      setInputValue={setInputValue}
    />
  ) : (
    GameStart
  );
};

export default GameStart;
