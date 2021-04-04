import React, { useState, useEffect, useRef } from "react";
import SideImage from "../../Assets/sideGrid.png";
import Character from "../../Assets/character.png";
import Styles from "./Styles.module.css";
import GamePlay from "../GamePlay/GamePlay";

const GameStart = ({ state }) => {
  const [inputValue, setInputValue] = useState(5);
  const [start, setStart] = useState(false);
  const {
    main,
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
  } = Styles;
  const inputValue2 = useRef(inputValue);

  const handleChange = (e) => {
    

      setInputValue(e.target.value);
    
  };

  useEffect(() => {
    if(state.inputValue) {
      inputValue2.current = (state.inputValue);
    }
  });
    // setInputValue(inputValue2.current);
  
  const GameStart = (
    <div className={main}>
      <div className={container}>
        <div>
          <img src={SideImage} alt="Side grid" />
        </div>

        <div className={middle}>
          <img className={char} src={Character} alt="character" />
          <div className={title}>{state.title}</div>

          <div className={text1}>
            {state.text1} {state.food ? state.food + '/' + state.grid: null}
          </div>
          <div className={text2}>
            {state.text2}
            {state.sec2 || state.sec1 || state.min1 || state.min2
              ? (state.min1 + state.min2 + ":" + state.sec1 + state.sec2) 
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

            <input
              onChange={handleChange}
              className={input}
              autoFocus
              min="5"
              max="12"
              type="number"
              value={inputValue}
            />
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

        <div>
          <img src={SideImage} alt="Side grid" />
        </div>
      </div>
    </div>
  );

  return start ? (
    <GamePlay state={{ ...state, grid: inputValue }} />
  ) :  (
    GameStart
  );
};

export default GameStart;
