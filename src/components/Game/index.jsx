import './index.scss';
import React, { useState } from 'react';

import Board from '../Board/index.jsx';
import BoardSize from '../../utils/board-size.js';
import calculateWinner from '../../utils/calculate-winner.js';

const INITIAL_STATE = {
  history: [
    {
      squares: new Array(BoardSize.getTotal()).fill(null),
    }
  ],
  isXNext: true,
  stepNumber: 0,
};

export default function Game() {
  const [state, setState] = useState(INITIAL_STATE);

  const current = state.history[state.stepNumber];
  const winner = calculateWinner(current.squares);

  const status = winner
    ? `Winner: ${winner}`
    : `Next player: ${state.isXNext ? 'X' : 'O'}`;

  const handleClick = (i) => {
    const history = state.history.slice(0, state.stepNumber + 1);
    const current = history[history.length - 1];
    const winner = calculateWinner(current.squares);
    if (winner || current.squares[i]) {
      return;
    }
    const squares = [...current.squares];
    squares[i] = state.isXNext ? 'X' : 'O';
    setState((prevState) => ({
      ...prevState,
      history: history.concat({ squares }),
      isXNext: !prevState.isXNext,
      stepNumber: history.length,
    }));
  }

  const handleJumpTo = (step) => {
    setState((prevState) => ({
      ...prevState,
      stepNumber: step,
      isXNext: step % 2 === 0,
    }));
  }

  const moves = state.history.map((_item, step) => {
    const legend = (step === 0)
      ? 'Go to game start'
      : `Go to step #${step}`;
    return (
      <li className="game__move" key={step}>
        <button
          className={
            ['game__button']
              .concat(step === state.stepNumber ? 'game__button--current' : [])
              .join(' ')
          }
          type="button"
          onClick={() => {
            handleJumpTo(step);
          }}
        >
          {legend}
        </button>
      </li>
    )
  });

  return (
    <main className="game">
      <h1 className="game__title">
        <a className="game__reference" href="https://reactjs.org/tutorial/tutorial.html">React official tutorial: Tic Tac Toe</a>
      </h1>
      <Board
        classNames="game__board"
        squares={current.squares}
        onClick={(i) => {
          handleClick(i);
        }}
      />
      <div className="game__info">
        <div className="game__status">{status}</div>
        <ol className="game__history">{moves}</ol>
      </div>
    </main>
  );
}
