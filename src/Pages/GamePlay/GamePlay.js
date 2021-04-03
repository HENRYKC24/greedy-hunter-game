import React, { useEffect, useState } from "react";
import BackgroundImage from "../../Assets/gamePlayBg.jpg";
import Styles from "./Styles.module.css";
import Life from "../../Assets/heart.png";
import LifeBarBackground from "../../Assets/live-track.png";
import LifeBar from "../../Assets/live.png";
import Rows from "./Rows";

const GamePlay = (props) => {
  const [secs, setSecs] = useState(0);
  const [mins, setMins] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      if (secs === 59) {
        setSecs(() => 0);
        setMins((prev) => prev + 1);
      } else {
        setSecs((prev) => prev + 1);
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  });
  const { board, life, topContainer, heart, lifeBar, lifeBack, grid } = Styles;
  const produceRows = param => {
    let rows = [];
    for(let i = 1; i <= param; i += 1) {
      rows.push(<div><Rows grid={grid} rows={props.state.grid}  /></div>)
      // rows.push(<br />);
    };
    return rows;
  }
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
              {props.state.grid} &times; {props.state.grid}
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
          <div>
            Time spent: <span style={{fontWeight: 'bolder'}}>{mins.toString().length === 1 ? 0 : null}
            {mins}:{secs.toString().length === 1 ? 0 : null}
            {secs} secs</span>
          </div>
        </div>

       <div className={grid}>{produceRows(props.state.grid)}</div> 

        <div className={topContainer}>
          <div>
            Maximum moves:{" "}
            <span style={{fontWeight: 'bolder'}}>{Math.round((props.state.grid * props.state.grid) / 2)}</span>
          </div>

          <div>Total moves: <span style={{fontWeight: 'bolder'}}>{0}</span></div>
        </div>
      </div>
    </div>
  );
};

export default GamePlay;
