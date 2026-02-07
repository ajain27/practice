import { useState } from "react";
import "./style.css";
const initialBoard = () => Array(9).fill(null);

function TicTacToe() {
  const [board, setBoard] = useState(initialBoard);
  const [isNextX, setIsNextX] = useState(true);

  const WINNING_PATTERN = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  const calculateWinner = (currentBoard) => {
    for (let i = 0; i < WINNING_PATTERN.length; i++) {
      const [a, b, c] = WINNING_PATTERN[i];
      if (
        currentBoard[a] &&
        currentBoard[a] === currentBoard[b] &&
        currentBoard[a] === currentBoard[c]
      ) {
        return currentBoard[a];
      }
    }
    return null;
  };

  const handleClick = (id) => {
    const winner = calculateWinner(board);
    if (winner || board[id]) return;
    const newBoard = [...board];
    newBoard[id] = isNextX ? "X" : "O";
    setBoard(newBoard);
    setIsNextX(!isNextX);
  };

  const reset = () => {
    setBoard(initialBoard);
    setIsNextX(isNextX);
  };

  const getMessage = () => {
    const winner = calculateWinner(board);
    if (winner) return `Player ${winner} wins`;
    if (!board.includes(null)) return `Its a draw`;
    return `Player ${isNextX ? "X" : "O"} turn`;
  };

  return (
    <div>
      <div className="game">
        <div className="status">
          {getMessage()}
          <button onClick={reset}>Reset</button>
        </div>
        <div className="board">
          {board.map((b, id) => (
            <button className="cell" onClick={() => handleClick(id)} key={id}>
              {b}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default TicTacToe;
