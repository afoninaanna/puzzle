import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';
import { puzzleWrapperStyles } from './styles';
import { shuffle, isEqual } from './utils';
import Piece from './Piece';
import s from './../Admin/style.module.css';

const Puzzle = (props) => {
  const { width, height, pieces, piecesX, piecesY, onComplete } = props;
  const rootPositions = [...Array(piecesX * piecesY).keys()];
  console.log(rootPositions);
  const [positions, setPositions] = useState(rootPositions);
  
  console.log(positions);
  const coords = rootPositions.map((pos) => ({
    x: Math.floor((pos % piecesX) * (width / piecesX)),
    y: Math.floor(pos / piecesX) * (height / piecesY),
  }));

  const onDropPiece = (sourcePosition, dropPosition) => {
    const oldPositions = positions.slice();
    const newPositions = [];

    for (let i in oldPositions) {
      const value = oldPositions[i];
      let newValue = value;

      if (value === sourcePosition) {
        newValue = dropPosition;
      } else if (value === dropPosition) {
        newValue = sourcePosition;
      }

      newPositions.push(newValue);
    }
    setPositions(newPositions);

    if (isEqual(rootPositions, newPositions)) {
      onComplete();
    }
  };

  const renderPieces = () =>
    positions.map((i) => (
      <Piece key={i} position={i} onDropPiece={onDropPiece} {...coords[i]} {...props} />
    ));

  return (
    <div>
    <DndProvider backend={HTML5Backend}>
      <div style={puzzleWrapperStyles({ width, height })}>{renderPieces()}</div>
      <style>
        {`
          .puzzle-piece:hover {
            opacity: 0.8;
          }
        `}
      </style>
    </DndProvider>
    <div style={{ display: "flex", gap: 10 + "px" }}>
        <button
          onClick={() => setPositions(shuffle(rootPositions))}
          className={s.Button}
          style={{ paddingLeft: 50 + "px", paddingRight: 50 + "px" }}
        >
          Перемешать
        </button>
        <button
          className={s.Button}
          style={{ paddingLeft: 50 + "px", paddingRight: 50 + "px" }}
        >
          Сохранить
        </button>
      </div>
      <button onClick={() => props.onSelectComponent("")} className={s.Button}>
        Закрыть
      </button>
    </div>
  );
};

Puzzle.propTypes = {
  image: PropTypes.string.isRequired,
  width: PropTypes.number,
  height: PropTypes.number,
  pieces: PropTypes.number,
  piecesCompleted: (props) =>
    props['pieces'] < 3 && new Error('Invalid prop type `pieces`. It should be >= 1'),
  onComplete: PropTypes.func,
};

Puzzle.defaultProps = {
  width: 400,
  height: 300,
  pieces: 3,
  onComplete: () => {},
};

export default Puzzle;
