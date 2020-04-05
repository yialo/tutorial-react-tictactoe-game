import './index.scss';
import React from 'react';

export default function Square(props) {
  const { classNames, value, onClick } = props;
  return (
    <button
      className={['square'].concat(classNames ?? []).join(' ')}
      onClick={onClick}
    >
      <span>{value}</span>
    </button>
  );
}
