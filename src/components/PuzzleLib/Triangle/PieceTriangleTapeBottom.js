import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { useDrag, useDrop } from 'react-dnd';
import { puzzlePieceTapeBottomStyles } from '../styles';

const PieceTriangleBottom = memo((props) => {
  const { position, indexTape } = props;

  const [, dragEl] = useDrag({
    item: { position, indexTape, type: "PIECE-BOTTOM" },
  });

  return (
    <div className="puzzle-piece">
      <div
        className="triangle reverse"
        ref={dragEl}
        style={puzzlePieceTapeBottomStyles({ ...props })}
      ></div>
    </div>
  );
});

PieceTriangleBottom.propTypes = {
  image: PropTypes.string.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
};

export default PieceTriangleBottom;
