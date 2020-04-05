import React from 'react';

import Square from '../Square/index.jsx';
import BoardSize from '../../utils/board-size.js';

export default class Board extends React.Component {
  renderCol(rowIndex, colIndex) {
    const squareIndex = rowIndex * BoardSize.HEIGHT + colIndex;
    return (
      <Square
        key={squareIndex}
        value={this.props.squares[squareIndex]}
        onClick={() => {
          this.props.onClick(squareIndex);
        }}
      />
    );
  }

  render() {
    const rows = new Array(BoardSize.HEIGHT).fill(null);
    return (
      <React.Fragment>
        {rows.map((_row, i) => {
          const cols = new Array(BoardSize.WIDTH).fill(null);
          return (
            <div className="board-row" key={i}>
              {cols.map((_col, j) => this.renderCol(i, j))}
            </div>
          );
        })}
      </React.Fragment>
    );
  }
}
