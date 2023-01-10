import React, { useState, useEffect } from "react";
import PropTypes from 'prop-types';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';
import { puzzleWrapperStyles } from './styles';
import { shuffle, isEqual } from './utils';
import Piece from './Piece';
import PieceTape from "./PieceTape";
import s from './../Admin/style.module.css';

let positionScore = []
const Puzzle = (props) => {
  const { width, height, piecesX, piecesY, onComplete } = props;
  //Изначальные позиции пазла
  const rootPositions = [...Array(piecesX * piecesY).keys()];
  //Выбор изначальных позиций (из БД - если игрок, изначальные - если админ)
  const [positions, setPositions] = useState(
    props.positions ? props.positions : rootPositions
  );
  //Если сборка на ленте, то используем эту переменную как отдельные позиции на поле
  const [draggedElements, setDraggedElements] = useState(
    [...Array(piecesX * piecesY)].map(() => null)
  );

  const coords = rootPositions.map((pos) => ({
    x: Math.floor((pos % piecesX) * (width / piecesX)),
    y: Math.floor(pos / piecesX) * (height / piecesY),
  }));

  //--- Ф-ии администратора ---//
  //При смене сложности фрагменты возвращаются в исходное положение
  useEffect(() => {
    if (props.difficulty) {
      setPositions(rootPositions);
    }
    setDraggedElements([...Array(piecesX * piecesY)].map(() => null));
  }, [props.difficulty]);

  //Для перемешивания фрагментов при нажатии на кнопку "Перемешать"
  useEffect(() => {
    if (props.isShuffled) {
      setPositions(shuffle(rootPositions));
      props.setIsShuffled(false);
    }
  }, [props.isShuffled]);

  //--- Ф-ии админа и игрока ---//
  //Получаем координаты после перемешивания или при перестановке фрагментов
  const handleCurrentPositions = () => {
    var pos = positions;
    props.currentPos(pos);
  };
  useEffect(() => {
    handleCurrentPositions();
  }, [positions]);

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
    //console.log("srcPos: " + sourcePosition, "drpPos: " + dropPosition);
    // console.log("indxField: " + indexField, "indxTape: " + indexTape);
    // console.log("draggedElements[indxField]: " + draggedElements[indexField]);
    if (dropPosition == null && indexTape != null) {
      setPositions([...positions.filter((elem) => elem !== sourcePosition)]);
      const newDraggedElements = [...draggedElements];
      newDraggedElements[indexField] = sourcePosition;
      setDraggedElements([]);
      setDraggedElements(newDraggedElements);
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
    }
    // Пока не знаю как реализовать обмен фрагментов на поле м/у пустым и непустым
    // else if (dropPosition == null && indexTape == undefined) {
    //   const newDraggedElements = [...draggedElements];
    //   newDraggedElements[indexField] = newDraggedElements[lastIndex];
    //   newDraggedElements[lastIndex] = null;
    //   setDraggedElements(newDraggedElements);
    // }
    // lastIndex = indexField;
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
        props.setScore(props.score + 10);
      } else {
        if (!positionScore.includes(sourcePosition)) {
          positionScore.push(sourcePosition);
          props.setScore(props.score + 10);
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

  const renderPiecesWithTape = () =>
    draggedElements.map((i, index) => (
      <Piece
        key={index + "_field"}
        position={i}
        indexField={index}
        onDropPiece={onDropPieceWithTape}
        {...coords[i]}
        {...props}
      />
    ));

  const renderPiecesTape = () =>
    positions.map((i, index) => (
      <PieceTape
        key={index + "_tape"}
        position={i}
        indexTape={index}
        {...coords[i]}
        {...props}
      />
    ));

  const renderPiecesOnlyField = () =>
    positions.map((i, index) => (
      <Piece
        key={index + "_field"}
        position={i}
        indexField={index}
        onDropPiece={onDropPieceOnlyField}
        {...coords[i]}
        {...props}
      />
    ));

  return (
    <DndProvider backend={HTML5Backend}>
      <div style={{ display: "flex", gap: 20 }}>
        <div style={puzzleWrapperStyles({ width, height })}>
          {props.assemblyType == "На ленте"
            ? renderPiecesWithTape()
            : renderPiecesOnlyField()}
        </div>
        {props.assemblyType == "На ленте" ? (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 20,
              height: 400,
              width: "auto",
              paddingRight: 10,
              overflowY: "scroll",
              border: 1 + " solid" + " #ccc",
            }}
          >
            {renderPiecesTape()}
          </div>
        ) : null}
        <style>
          {`
          .puzzle-piece:hover {
            opacity: 0.8;
          }
        `}
        </style>
      </div>
    </DndProvider>
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
