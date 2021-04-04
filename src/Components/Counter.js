import React, { useEffect, useState } from "react";
let Min, Sec;
const Counter = () => {
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
  Min = mins;
  Sec = secs;
  return (
    <div>
      Time spent:{" "}
      <span style={{ fontWeight: "bolder" }}>
        {mins.toString().length === 1 ? 0 : null}
        {mins}:{secs.toString().length === 1 ? 0 : null}
        {secs} secs
      </span>
    </div>
  );
};

export default Counter;
export {Min, Sec};

