import './index.scss';
import React from 'react';

import Square from '../Square/index.jsx';
import BoardSize from '../../utils/board-size.js';

function Board(props) {
  const { classNames, squares, winnerLine, onClick } = props;
  return (
    <div className={['board'].concat(classNames ?? []).join(' ')}>
      {new Array(BoardSize.getTotal()).fill(null).map((_it, i) => (
        <Square
          key={i}
          classNames="board__field"
          value={squares[i]}
          isHighlighted={winnerLine.includes(i)}
          onClick={() => {
            onClick(i);
          }}
        />
      ))}
    </div>
  );
}

export default Board;
