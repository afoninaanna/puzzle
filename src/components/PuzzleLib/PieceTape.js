import React, { memo } from "react";
import PropTypes from "prop-types";
import { useDrag, useDrop } from "react-dnd";
import { puzzlePieceStyles } from "./styles";

const PieceTape = memo((props) => {
  // console.log(props);
  const { position, indexTape } = props;

  const [, dragEl] = useDrag({
    item: { position, indexTape, type: "PIECE" },
  });

  return (
    <div className="puzzle-piece">
      <div ref={dragEl} style={puzzlePieceStyles({ ...props })}></div>
    </div>
  );
});

PieceTape.propTypes = {
  image: PropTypes.string.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  position: PropTypes.number.isRequired,
};

export default PieceTape;
