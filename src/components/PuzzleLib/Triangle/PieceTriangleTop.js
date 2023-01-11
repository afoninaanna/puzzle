import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { useDrag, useDrop } from 'react-dnd';
import { puzzlePieceTopStyles } from '../styles';

const PieceTriangleTop = memo((props) => {
  const { position, onDropPiece } = props;

  const [, dragEl] = useDrag({
    item: { position, type: 'PIECE-TOP' },
  });

  const [{ isOver }, dropRef] = useDrop({
    accept: 'PIECE-TOP',
    drop: (props) => {
      onDropPiece(
        props.position, // source position
        position // drop position
      );
    },
    collect: (monitor) => {
      return {
        isOver: monitor.isOver()
      }
    }
  });

  return (
    <div className="puzzle-piece" ref={dropRef}>
      <div
        className="triangle"
        ref={dragEl}
        style={puzzlePieceTopStyles({ ...props, isOver })}
      ></div>
    </div>
  );
});

PieceTriangleTop.propTypes = {
  image: PropTypes.string.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  onDropPiece: PropTypes.func.isRequired,
};

export default PieceTriangleTop;
