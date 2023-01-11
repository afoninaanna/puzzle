import React, { useState, useEffect } from "react";
import PropTypes from 'prop-types';
import { DndProvider } from 'react-dnd';
import { puzzleWrapperStyles, puzzleTapeStyles } from '../styles';
import { shuffleTriangle, isEqual } from "../utils";
import PieceTriangleTop from "./PieceTriangleTop";
import PieceTriangleBottom from "./PieceTriangleBottom";
import PieceTriangleTapeTop from "./PieceTriangleTapeTop";
import PieceTriangleTapeBottom from "./PieceTriangleTapeBottom";
import { HTML5Backend } from "react-dnd-html5-backend";

let positionScore = [];
const PuzzleTriangle = (props) => {
  if (window.__isReactDndBackendSetUp) {
    window.__isReactDndBackendSetUp = false;
  }

  const { piecesX, width, height, piecesY, onComplete } = props;
  //Изначальные позиции пазла
  const rootPositions = [...Array(piecesX * piecesY).keys()];
  //Выбор изначальных позиций (из БД - если игрок, изначальные - если админ)
  const [positions, setPositions] = useState(
    props.positions ? props.positions : rootPositions
  );
  /*
  Если сборка на ленте, то используем эту переменную как отдельные позиции на поле.
  Выбор изначальных позиций (из БД - если игрок, пустые - если админ)
  */
  const [draggedElements, setDraggedElements] = useState(
    props.draggedElements
      ? [...Array(piecesX * piecesY)].map((i, index) =>
          props.draggedElements[index] != null
            ? props.draggedElements[index]
            : null
        )
      : [...Array(piecesX * piecesY)].map(() => null)
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
      setDraggedElements([...Array(piecesX * piecesY)].map(() => null));
    }
  }, [props.difficulty]);

  //Для перемешивания фрагментов при нажатии на кнопку "Перемешать"
  useEffect(() => {
    if (props.isShuffled) {
      setPositions(shuffleTriangle(rootPositions));
      props.setIsShuffled(false);
      setDraggedElements([...Array(piecesX * piecesY)].map(() => null));
    }
  }, [props.isShuffled]);

  //--- Ф-ии админа и игрока ---//
  //Получаем координаты после перемешивания или при перестановке фрагментов
  const handleCurrentPositions = () => {
    let pos = positions;
    props.currentPos(pos);
  };
  const handleCurrentDraggedElements = () => {
    let dragPos = draggedElements;
    props.currentDragPos(dragPos);
  };
  useEffect(() => {
    handleCurrentPositions();
    if (props.assemblyType == "На ленте") {
      handleCurrentDraggedElements();
    }
    console.log(positions);
  }, [positions, draggedElements]);

  //Надо обнулить позиции с которых не получаются очки
  useEffect(() => {
    positionScore = [];
  }, []);

  //Триггер конца игры
  useEffect(() => {
    if (isEqual(rootPositions, positions)) {
      onComplete();
    }
    if (isEqual(rootPositions, draggedElements)) {
      onComplete();
    }
  }, [positions, draggedElements]);

  //Функция для перестановки фрагментов, если сборка на ленте
  const onDropPieceWithTape = (
    sourcePosition,
    dropPosition,
    indexField,
    indexTape
  ) => {
    let newArr = [];
    if (dropPosition == null && indexTape != null) {
      setPositions([...positions.filter((elem) => elem !== sourcePosition)]);
      const newDraggedElements = [...draggedElements];
      newDraggedElements[indexField] = sourcePosition;
      setDraggedElements([]);
      setDraggedElements(newDraggedElements);
      newArr = newDraggedElements;
    } else if (
      sourcePosition != null &&
      dropPosition != null &&
      indexTape == undefined
    ) {
      const oldPositions = draggedElements.slice();
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
      setDraggedElements([]);
      setDraggedElements(newPositions);
      newArr = newPositions;
    }
    
    // Пока не знаю как реализовать обмен фрагментов на поле м/у пустым и непустым
    // else if (dropPosition == null) {
    //   const newDraggedElements = [...draggedElements];
    //   newDraggedElements[indexField] = newDraggedElements[lastIndex];
    //   newDraggedElements[lastIndex] = null;
    //   setDraggedElements(newDraggedElements);
    // }
    // lastIndex = indexField;
    countScore(sourcePosition, dropPosition, newArr);
  };

  //Функция для перестановки фрагментов, если сборка на поле
  const onDropPieceOnlyField = (
    sourcePosition,
    dropPosition,
    indexField,
    indexTape
  ) => {
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

  //Рендеринг фрагментов на поле, если режим "На ленте"
  const renderPiecesWithTape = () =>
    draggedElements.map((i, index) =>
      index % 2 == 0 ? (
        <PieceTriangleTop
          key={index + "_field"}
          position={i}
          indexField={index}
          onDropPiece={onDropPieceWithTape}
          {...coords[i]}
          {...props}
        />
      ) : (
        <PieceTriangleBottom
          key={index + "_field"}
          position={i}
          indexField={index}
          onDropPiece={onDropPieceWithTape}
          {...coords[i]}
          {...props}
        />
      )
    );
  //Рендеринг фрагментов на ленте, если режим "На ленте"
  const renderPiecesTape = () =>
    positions.map((i, index) =>
      i % 2 == 0 ? (
        <PieceTriangleTapeTop
          key={index + "_field"}
          position={i}
          indexTape={index}
          {...coords[i]}
          {...props}
        />
      ) : (
        <PieceTriangleTapeBottom
          key={index + "_field"}
          position={i}
          indexTape={index}
          {...coords[i]}
          {...props}
        />
      )
    );
  //Рендеринг фрагментов на поле, если режим "На поле"
  const renderPiecesOnlyField = () =>
    positions.map((i, index) =>
      index % 2 == 0 ? (
        <PieceTriangleTop
          key={index + "_field"}
          position={i}
          indexField={index}
          onDropPiece={onDropPieceOnlyField}
          {...coords[i]}
          {...props}
        />
      ) : (
        <PieceTriangleBottom
          key={index + "_field"}
          position={i}
          indexField={index}
          onDropPiece={onDropPieceOnlyField}
          {...coords[i]}
          {...props}
        />
      )
    );

  return (
    <DndProvider backend={HTML5Backend} key={1}>
      <div style={{ display: "flex", gap: 20 }}>
        <div style={puzzleWrapperStyles({ width, height })}>
          {props.assemblyType == "На ленте"
            ? renderPiecesWithTape()
            : renderPiecesOnlyField()}
        </div>
        {props.assemblyType == "На ленте" ? (
          <div style={puzzleTapeStyles({ width, height })}>
            {renderPiecesTape()}
          </div>
        ) : null}
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
      </div>
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
