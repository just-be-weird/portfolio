import React, {useState, Fragment} from "react";
import Board from "./Board";
import classes from "../Sass/main.module.scss";

const NotFound = () => {
  const [boardState, setBoardState] = useState({
    history: [
      {
        squares: Array(9).fill(null),
      },
    ],
    stepNumber: 0,
    xIsNext: true,
  });
  const calculateWinner = squares => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return squares[a];
      }
    }
    return null;
  };
  const handleClick = i => {
    const history = boardState.history.slice(0, boardState.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = boardState.xIsNext ? "X" : "O";
    setBoardState({
      ...boardState,
      history: history.concat([
        {
          squares: squares,
        },
      ]),
      stepNumber: history.length,
      xIsNext: !boardState.xIsNext,
    });
  };
  const jumpTo = step => {
    setBoardState({
      ...boardState,
      stepNumber: step,
      xIsNext: step % 2 === 0,
    });
  };
  const current = boardState.history[boardState.stepNumber];
  const winner = calculateWinner(current.squares);

  const moves = boardState.history.map((step, move) => {
    const desc = move ? "Go to move #" + move : "Go to game start";
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{desc}</button>
      </li>
    );
  });

  let status;
  if (winner) {
    status = "Winner: " + winner;
  } else {
    status = "Next player: " + (boardState.xIsNext ? "X" : "O");
  }

  return (
    <Fragment>
      <h1
        className={
          classes["heading-primary"] + " " + classes.notfound_heading
        }
      >
        <span className={classes.highlight}>Page Not Found</span>
      </h1>
      <p className={classes.actiontext}>
        We couldn't find what you were looking for, but you can try our
        tic-tac-toe game.
      </p>
      <div className={classes.game}>
        <div className={classes["game-board"]}>
          <Board
            squares={current.squares}
            onClick={i => handleClick(i)}
          />
        </div>
        <div className={classes["game-info"]}>
          <div>{status}</div>
          <ol className={classes.orderd__list}>{moves}</ol>
        </div>
      </div>
    </Fragment>
  );
};

export default NotFound;
