import React, { useState, useEffect } from "react";
import PropTypes from 'prop-types';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';
import { puzzleWrapperStyles } from '../styles';
import { shuffleTriangle, isEqual } from "../utils";
import PieceTriangleTop from "./PieceTriangleTop";
import PieceTriangleBottom from "./PieceTriangleBottom";

let positionScore = [];
const PuzzleTriangle = (props) => {
  const { piecesX, width, height, piecesY, onComplete } = props;
  //Изначальные позиции пазла
  const rootPositions = [...Array(piecesX * piecesY).keys()];
  //Выбор изначальных позиций (из БД - если игрок, изначальные - если админ)
  const [positions, setPositions] = useState(
    props.positions ? props.positions : rootPositions
  );

  //Координаты фрагментов
  const coords = rootPositions.map((pos) => ({
    x:
      (pos % piecesX) % 2
        ? ((pos - 1) % piecesX) * (width / piecesX)
        : (pos % piecesX) * (width / piecesX),
    y: Math.floor(pos / piecesX) * (height / piecesY),
  }));

  //--- Ф-ии администратора ---//
  //При смене сложности фрагменты возвращаются в исходное положение
  useEffect(() => {
    if (props.difficulty) {
      setPositions(rootPositions);
      // setDraggedElements([...Array(piecesX * piecesY)].map(() => null));
    }
  }, [props.difficulty]);

  //Для перемешивания фрагментов при нажатии на кнопку "Перемешать"
  useEffect(() => {
    if (props.isShuffled) {
      setPositions(shuffleTriangle(rootPositions));
      props.setIsShuffled(false);
    }
  }, [props.isShuffled]);

  //--- Ф-ии админа и игрока ---//
  //Получаем координаты после перемешивания или при перестановке фрагментов
  const handleCurrentPositions = () => {
    let pos = positions;
    props.currentPos(pos);
  };
  // const handleCurrentDraggedElements = () => {
  //   let dragPos = draggedElements;
  //   props.currentDragPos(dragPos);
  // };
  useEffect(() => {
    handleCurrentPositions();
    // if (props.assemblyType == "На ленте") {
    //   handleCurrentDraggedElements();
    // }
  }, [positions /*draggedElements*/]);

  //Надо обнулить позиции с которых не получаются очки
  useEffect(() => {
    positionScore = [];
  }, []);

  //Триггер конца игры
  useEffect(() => {
    if (isEqual(rootPositions, positions)) {
      onComplete();
    }
    // if (isEqual(rootPositions, draggedElements)) {
    //   onComplete();
    // }
  }, [positions /*draggedElements*/]);

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
    countScore(sourcePosition, dropPosition, newPositions);
  };

  //Подсчет очков
  const countScore = (sourcePosition, dropPosition, newPositions) => {
    if (
      sourcePosition != dropPosition &&
      newPositions[sourcePosition] == sourcePosition
    ) {
      if (positionScore.length == 0) {
        positionScore.push(sourcePosition);
        props.setScore(props.score + 20);
      } else {
        if (!positionScore.includes(sourcePosition)) {
          positionScore.push(sourcePosition);
          props.setScore(props.score + 20);
        }
      }
    } else if (sourcePosition == dropPosition) {
      props.setScore(props.score);
    } else {
      if (props.score < 5) {
        props.setScore(0);
      } else {
        props.setScore(props.score - 5);
      }
    }
  };

  const renderPieces = () =>
    positions.map((i, index) =>
      index % 2 == 0 ? (
        <PieceTriangleTop
          key={i}
          position={i}
          onDropPiece={onDropPiece}
          {...coords[i]}
          {...props}
        />
      ) : (
        <PieceTriangleBottom
          key={i}
          position={i}
          onDropPiece={onDropPiece}
          {...coords[i]}
          {...props}
        />
      )
    );

  return (
    <DndProvider backend={HTML5Backend}>
      <div style={puzzleWrapperStyles({ width, height })}>{renderPieces()}</div>
      <style>
        {`
          .puzzle-piece:hover {
            opacity: 0.8;
          }
          .triangle {
            width: 0;
            height: 0;
            border-style: solid;
            border-width: 0 50px 50px 50px;
            border-color: transparent transparent #000 transparent;
            clip-path: polygon(0 0, 100% 0, 0% 100%);
          }
          .triangle.reverse {
            border-color: #000 transparent transparent transparent;
            clip-path: polygon(0 100%, 100% 100%, 100% 0);
          }
        `}
      </style>
    </DndProvider>
  );
};

PuzzleTriangle.propTypes = {
  image: PropTypes.string.isRequired,
  width: PropTypes.number,
  height: PropTypes.number,
  piecesX: PropTypes.number,
  piecesY: PropTypes.number,
  piecesCompleted: (props) =>
    props["pieces"] < 3 &&
    new Error("Invalid prop type `pieces`. It should be >= 1"),
  onComplete: PropTypes.func,
};

PuzzleTriangle.defaultProps = {
  width: 400,
  height: 300,
  piecesX: 3,
  piecesY: 3,
  onComplete: () => {},
};

export default PuzzleTriangle;
