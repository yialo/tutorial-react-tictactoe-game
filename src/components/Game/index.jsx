import React from 'react';

import Board from '../Board/index.jsx';
import BoardSize from '../../utils/board-size.js';
import calculateWinner from '../../utils/calculate-winner.js';

export default class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [
        {
          squares: new Array(BoardSize.getTotal()).fill(null),
        }
      ],
      isXNext: true,
      stepNumber: 0,
    };
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const winner = calculateWinner(current.squares);
    if (winner || current.squares[i]) {
      return;
    }
    const squares = [...current.squares];
    squares[i] = this.state.isXNext ? 'X' : 'O';
    this.setState((prevState) => ({
      history: history.concat({ squares }),
      isXNext: !prevState.isXNext,
      stepNumber: history.length,
    }));
  }

  handleJumpTo(step) {
    this.setState((prevState) => ({
      stepNumber: step,
      isXNext: step % 2 === 0,
    }));
  }

  render() {
    const { history, isXNext, stepNumber } = this.state;
    const current = history[stepNumber];
    const winner = calculateWinner(current.squares);

    const status = winner
      ? `Winner: ${winner}`
      : `Next player: ${isXNext ? 'X' : 'O'}`;

    const moves = history.map((_item, step) => {
      const legend = (step === 0)
        ? 'Go to game start'
        : `Go to step #${step}`;
      return (
        <li key={step}>
          <button
            className={
              ['step-button']
                .concat(step === stepNumber ? 'step-button--current' : [])
                .join(' ')
            }
            type="button"
            onClick={() => {
              this.handleJumpTo(step);
            }}
          >
            {legend}
          </button>
        </li>
      )
    });

    return (
      <div className="game">
        <div className="game__board">
          <Board
            squares={current.squares}
            onClick={(i) => {
              this.handleClick(i);
            }}
          />
        </div>
        <div className="game__info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}
