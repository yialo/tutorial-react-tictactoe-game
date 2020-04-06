import './index.scss';
import React from 'react';

import Square from '../Square/index.jsx';
import BoardSize from '../../utils/board-size.js';

export default function Board(props) {
  const { classNames, squares, onClick } = props;
  return (
    <div className={['board'].concat(classNames ?? []).join(' ')}>
      {new Array(BoardSize.getTotal()).fill(null).map((_it, i) => (
        <Square
          key={i}
          classNames="board__field"
          value={squares[i]}
          onClick={() => {
            onClick(i);
          }}
        />
      ))}
    </div>
  );
}
