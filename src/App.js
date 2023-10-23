import { useState } from "react";
import "./styles.css";

export default function App() {
  const matrix = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""]
  ];

  const [imatrix, setimatrix] = useState(matrix);

  const [flag, setflag] = useState(1);

  const [winnermsg, setwinnermsg] = useState("");

  const check_2 = (p) => {
    if (p.length == 3 && p == "OOO") {
      setwinnermsg("game over! player 1 wins");
      return true;
    } else if (p.length == 3 && p == "XXX") {
      setwinnermsg("game over! player 2 wins");
      return true;
    } else {
      return false;
    }
  };

  const check = (e) => {
    for (j = 0; j < 3; j++) {
      var p = "";
      for (i = 0; i < 3; i++) {
        p += e[i][j];
      }

      if (!check_2(p)) {
        continue;
      }
    }

    for (i = 0; i < 3; i++) {
      var p = "";
      for (j = 0; j < 3; j++) {
        p += e[i][j];
      }
      if (!check_2(p)) {
        continue;
      }
    }

    var p = e[0][0] + e[1][1] + e[2][2];

    check_2(p);

    var p = e[2][0] + e[1][1] + e[0][2];

    check_2(p);
  };

  const helper = (rowIndex, cellIndex) => {
    if (flag === 1) {
      const e = [...imatrix];
      e[rowIndex][cellIndex] = "O";
      setimatrix(e);
      check(e);
      setflag(2);
    } else {
      const e = [...imatrix];
      e[rowIndex][cellIndex] = "X";
      setimatrix(e);
      check(e);
      setflag(1);
    }
  };

  return (
    <div className="matrix">
      {imatrix.map((row, rowIndex) => (
        <div className="row" key={rowIndex}>
          {row.map((cell, cellIndex) => (
            <div
              className="cell"
              key={cellIndex}
              onClick={() => helper(rowIndex, cellIndex)}
            >
              {cell}
            </div>
          ))}
        </div>
      ))}
      <div className="turn">{flag} player turn</div>
      <div className="winner">{winnermsg}</div>
    </div>
  );
}
