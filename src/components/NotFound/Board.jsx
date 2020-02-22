import React from "react";
import Square from "./Square";
import classes from "../Sass/main.module.scss";

const Board = ({ onClick, squares }) => {
  const renderSquare = i => {
    return <Square value={squares[i]} onClick={() => onClick(i)} />;
  };
  return (
    <div>
      <div className={classes["board-row"]}>
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className={classes["board-row"]}>
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className={classes["board-row"]}>
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
    </div>
  );
};

export default Board;
