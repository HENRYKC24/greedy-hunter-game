import React from "react";
import BackgroundImage from "../../Assets/gamePlayBg.jpg";
import Styles from './Styles.module.css';

const GamePlay = () => {
  const {board} = Styles;
  return (
    <div
      style={{
        backgroundImage: `url(${BackgroundImage})`,
        backgroundAttachment: "fixed",
        backgroundSize: "100% 100%",
        width: '100%',
        height: '100%',
        paddingTop: 100,
        paddingBottom: 100,
      }}
    >
      <div className={board}>

      </div>
    </div>
  );
};

export default GamePlay;
