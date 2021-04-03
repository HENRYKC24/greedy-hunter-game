import React from "react";

const Rows = (props) => {
  const produceRows = (param) => {
    console.log(props);
    let rows = [];
    for (let i = 1; i <= param; i += 1) {
      console.log(rows);
      console.log(i);
      rows.push(
        <div
          style={{ width: 56, height: 50, border: "1.234345px solid #853594" }}
          className={"td"}
          id={"cell" + i}
        >
          
        </div>
      );
    }
    console.log(rows);
    return rows;
  };
  return produceRows(props.rows);
};

export default Rows;
