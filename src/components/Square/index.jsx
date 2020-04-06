import './index.scss';
import React from 'react';

function Square(props) {
  const { classNames, value, isHighlighted, onClick } = props;
  return (
    <button
      className={
        ['square']
          .concat(classNames ?? [])
          .concat(isHighlighted ? 'square--highlighted' : [])
          .join(' ')
      }
      onClick={onClick}
    >
      {value && <span>{value}</span>}
    </button>
  );
}

Square.defaultProps = {
  isHighlighted: false,
};

export default Square;
