import React from "react";
import SideImage from "../../Assets/sideGrid.png";
import Styles from './Styles.module.css';

const GameStart = () => {
  const {container, main} = Styles;
  return (
    <div className={main}>
      <div className={container}>
        <div>
          <img src={SideImage} alt="Side grid" />
        </div>

        <div></div>

        <div>
          <img src={SideImage} alt="Side grid" />
        </div>
      </div>
    </div>
  );
};

export default GameStart;
