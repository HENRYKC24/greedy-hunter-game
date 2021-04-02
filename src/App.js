import React, {useState} from "react";
import GamePlay from "./Pages/GamePlay/GamePlay";
import GameStart from "./Pages/GameStart/GameStart";


const App = () => {
  const [state, setState] = useState(true);
  const changeState = () => {
    setState(false);
  }
  return <>{state ? <GameStart changeState={changeState} title={'Greedy Hunter'}/>: <GamePlay /> }</>;
};

export default App;
