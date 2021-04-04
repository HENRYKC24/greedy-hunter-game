import React, { useState } from "react";
import GameStart from "../Pages/GameStart/GameStart";

const TakeOff = () => {
  const [state, setState] = useState({
    showStart: false,
    showPlay: true,
    title: "Greedy Hunter",
    grid: 0,
    text1: "The aim is to eat all the food in record time",
    text2: "Configure your game grid below 👇🏼",
    buttonText: "Start Game",
  });

  return <GameStart setState={setState} state={state} />;
};

export default TakeOff;
