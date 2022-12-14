import React, { useState, useEffect } from "react";
import PropTypes from 'prop-types';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';
import { puzzleWrapperStyles } from './styles';
import { shuffle, isEqual } from './utils';
import Piece from './Piece';
import s from './../Admin/style.module.css';

const Puzzle = (props) => {
  const { width, height, piecesX, piecesY, onComplete } = props;
  const rootPositions = [...Array(piecesX * piecesY).keys()];
  const [positions, setPositions] = useState(
    props.positions ? props.positions : rootPositions
  ); //Выбор изначальных позиций (из БД - если игрок, изначальные - если админ)

  const coords = rootPositions.map((pos) => ({
    x: Math.floor((pos % piecesX) * (width / piecesX)),
    y: Math.floor(pos / piecesX) * (height / piecesY),
  }));

  //--- Ф-ии администратора ---//
  useEffect(() => {
    //При смене сложности фрагменты возвращаются в исходное положение
    if(props.difficulty){
      setPositions(rootPositions);
    }
  }, [props.difficulty]);

  useEffect(() => {
    //Для перемешивания фрагментов при нажатии на кнопку "Перемешать"
    if (props.isShuffled) {
      setPositions(shuffle(rootPositions));
      props.setIsShuffled(false);
    }
  }, [props.isShuffled]);

  //--- Ф-ии админа и игрока ---//
  const handleCurrentPositions = () => {
    var pos = positions;
    props.currentPos(pos);
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

  useEffect(() => {
    handleCurrentPositions();
  }, [positions]);

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
