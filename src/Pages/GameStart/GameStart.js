import React, {useState} from "react";
import SideImage from "../../Assets/sideGrid.png";
import Character from "../../Assets/character.png";
import Styles from "./Styles.module.css";

const GameStart = (props) => {
  const [inputValue, setInputValue] = useState(5);
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

  const handleChange = (e) => {
    setInputValue(() => e.target.value);
  };

  return (
    <div className={main}>
      <div className={container}>
        <div>
          <img src={SideImage} alt="Side grid" />
        </div>

        <div className={middle}>
          <img className={char} src={Character} alt="character" />
          <div className={title}>{props.title}</div>

          <div className={text1}>
            The aim is to eat all the food in record time
          </div>
          <div className={text2}>Configure your game grid below 👇🏼</div>
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
              props.changeState(inputValue);
            }}
            className={button}
          >
            Start Game
          </button>
        </div>

        <div>
          <img src={SideImage} alt="Side grid" />
        </div>
      </div>
    </div>
  );
};

export default GameStart;
