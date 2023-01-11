import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { useDrag, useDrop } from 'react-dnd';
import { puzzlePieceBottomStyles } from '../styles';

const PieceTriangleBottom = memo((props) => {
  const { position, onDropPiece } = props;

  const [, dragEl] = useDrag({
    item: { position, type: 'PIECE-BOTTOM' },
  });

  const [{ isOver }, dropRef] = useDrop({
    accept: 'PIECE-BOTTOM',
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
        className="triangle reverse"
        ref={dragEl}
        style={puzzlePieceBottomStyles({ ...props, isOver })}
      ></div>
    </div>
  );
});

PieceTriangleBottom.propTypes = {
  image: PropTypes.string.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  onDropPiece: PropTypes.func.isRequired,
};

export default PieceTriangleBottom;
