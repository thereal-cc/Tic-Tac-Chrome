import React, { useState } from 'react';

const TicTacToe = () => {
  const initialBoard = Array(9).fill(null);
  const [board, setBoard] = useState(initialBoard);
  const [xIsNext, setXIsNext] = useState(true);

  const calculateWinner = () => {
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
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a];
      }
    }

    return null;
  };

  const handleClick = (index) => {
    if (calculateWinner() || board[index]) {
      return;
    }

    const newBoard = board.slice();
    newBoard[index] = xIsNext ? 'X' : 'O';
    setBoard(newBoard);
    setXIsNext(!xIsNext);
  };

  const handleReset = () => {
    setBoard(initialBoard);
    setXIsNext(true);
  };

  const renderSquare = (index) => (
    <button
      className="w-16 h-16 bg-gray-300 border border-gray-500 text-2xl font-bold"
      onClick={() => handleClick(index)}
    >
      {board[index]}
    </button>
  );

  const winner = calculateWinner();
  const status = winner
    ? `Winner: ${winner}`
    : `Next player: ${xIsNext ? 'X' : 'O'}`;

  return (
    <div className="flex flex-col items-center mt-8">
      <div className="font-bold text-xl mb-4">{status}</div>
      <div className="grid grid-cols-3 gap-4">
        {Array(9)
          .fill(null)
          .map((_, index) => (
            <div key={index}>{renderSquare(index)}</div>
          ))}
      </div>
      <button
        className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={handleReset}
      >
        Reset Game
      </button>
    </div>
  );
};

export default TicTacToe;