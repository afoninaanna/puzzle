import React, { useState, useEffect } from "react";
import PropTypes from 'prop-types';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';
import { puzzleWrapperStyles } from './styles';
import { shuffle, isEqual } from './utils';
import Piece from './Piece';
import s from './../Admin/style.module.css';

const Puzzle = (props) => {
  useEffect(() => {
    setPositions(rootPositions);
  }, [props]);

  const { width, height, piecesX, piecesY, onComplete } = props;
  const rootPositions = [...Array(piecesX * piecesY).keys()];
  const [positions, setPositions] = useState(rootPositions);

  const coords = rootPositions.map((pos) => ({
    x: Math.floor((pos % piecesX) * (width / piecesX)),
    y: Math.floor(pos / piecesX) * (height / piecesY),
  }));

  const handlePos = () => {
    var pos = positions;
    props.onPos(pos);
  };

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
      <Piece
        key={i}
        position={i}
        onDropPiece={onDropPiece}
        {...coords[i]}
        {...props}
      />
    ));

  return (
    <div>
      <DndProvider backend={HTML5Backend}>
        <div style={puzzleWrapperStyles({ width, height })}>
          {renderPieces()}
        </div>
        <style>
          {`
          .puzzle-piece:hover {
            opacity: 0.8;
          }
        `}
        </style>
      </DndProvider>
      <div style={{display: "flex", gap: 10+"px"}}>
        <button
          onClick={() => setPositions(shuffle(rootPositions))}
          className={s.Button}
          style={{ paddingLeft: 50 + "px", paddingRight: 50 + "px" }}
        >
          Перемешать
        </button>
        <button
          className={s.Button}
          style={{
            marginTop: 10 + "px",
            paddingLeft: 50 + "px",
            paddingRight: 50 + "px",
          }}
          onClick={handlePos}
        >
          Сохранить
        </button>
      </div>
    </div>
  );
};

Puzzle.propTypes = {
  image: PropTypes.string.isRequired,
  width: PropTypes.number,
  height: PropTypes.number,
  piecesY: PropTypes.number,
  piecesX: PropTypes.number,
  onComplete: PropTypes.func,
};

Puzzle.defaultProps = {
  width: 400,
  height: 300,
  piecesY: 4,
  piecesX: 4,
  onComplete: () => {},
};

export default Puzzle;
