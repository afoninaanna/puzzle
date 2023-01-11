import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { useDrag, useDrop } from 'react-dnd';
import { puzzlePieceTapeTopStyles } from '../styles';

const PieceTriangleTop = memo((props) => {
  const { position, indexTape } = props;

  const [, dragEl] = useDrag({
    item: { position, indexTape, type: "PIECE-TOP" },
  });

  return (
    <div className="puzzle-piece">
      <div
        className="triangle"
        ref={dragEl}
        style={puzzlePieceTapeTopStyles({ ...props })}
      ></div>
    </div>
  );
});

PieceTriangleTop.propTypes = {
  image: PropTypes.string.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
};

export default PieceTriangleTop;
