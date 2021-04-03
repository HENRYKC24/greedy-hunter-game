import React, { useState } from "react";
import GamePlay from "./Pages/GamePlay/GamePlay";
import GameStart from "./Pages/GameStart/GameStart";

const App = () => {
  const [state, setState] = useState({
    showStart: false,
    showPlay: true,
    title: "Greedy Hunter",
    grid: 0,
  });
  const changeState = (param) => {
    setState(prev => ({
      ...prev,
      title: 'Greedy Hunter',
      showStart: true,
      showPlay: false,
      grid: param,
    }));
  };
  return (
    <>
      {state.showPlay ? (
        <GameStart changeState={changeState} state={state} />
      ) : (
        <GamePlay changeState={changeState} state={state} />
      )}
    </>
  );
};

export default App;
