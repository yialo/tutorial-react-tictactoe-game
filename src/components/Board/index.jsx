import './index.scss';
import React from 'react';

import Square from '../Square/index.jsx';
import BoardSize from '../../utils/board-size.js';

export default class Board extends React.PureComponent {
  render() {
    return (
      <div className={['board'].concat(this.props.classNames ?? []).join(' ')}>
        {new Array(BoardSize.getTotal()).fill(null).map((_it, i) => (
          <Square
            key={i}
            classNames="board__field"
            value={this.props.squares[i]}
            onClick={() => {
              this.props.onClick(i);
            }}
          />
        ))}
      </div>
    );
  }
}
