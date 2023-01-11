export const puzzleWrapperStyles = (props) => ({
    display: 'flex',
    flexWrap: 'wrap',
    padding: 0,
    width: `${props.width}px`,
    height: `${props.height}px`
});

export const puzzlePieceSquareStyles = (props) => ({
  width: `${props.width / props.piecesX}px`,
  height: `${props.height / props.piecesY}px`,
  margin: "0 -1px -1px",
  border: "1px solid #000",
  backgroundImage: `url(${props.image})`,
  backgroundSize: `${props.width}px ${props.height}px`,
  backgroundPosition: `-${props.x != null ? props.x : "9999"}px -${
    props.y != null ? props.y : "9999"
  }px`,
  opacity: `${props.isOver ? "0.2" : "1"}`,
  backgroundRepeat: "no-repeat",
  cursor: "move",
});

export const puzzleTapeStyles = (props) => ({
  display: "flex",
  flexDirection: "column",
  gap: 20,
  height: `${props.height}px`,
  width: "auto",
  paddingRight: 10,
  overflowY: "scroll",
  border: 1 + " solid" + " #ccc",
});

export const puzzlePieceTopStyles = (props) => ({
  position: "relative",
  zIndex: 1,
  width: `${(props.width / props.piecesX) * 2}px`,
  height: `${props.height / props.piecesY}px`,
  margin: "0 -1px -1px",
  border: "1px solid #000",
  backgroundImage: `url(${props.image})`,
  backgroundSize: `${props.width}px ${props.height}px`,
  backgroundPosition: `-${props.x}px -${props.y}px`,
  opacity: `${props.isOver ? "0.2" : "1"}`,
  backgroundRepeat: "no-repeat",
  cursor: "move",
});

export const puzzlePieceBottomStyles = (props) => ({
  position: "absolute",
  zIndex: 1,
  width: `${(props.width / props.piecesX) * 2}px`,
  height: `${props.height / props.piecesY}px`,
  margin: `0 -${props.width / (props.piecesX - props.piecesX / 2)}px -1px`,
  border: "1px solid #000",
  backgroundImage: `url(${props.image})`,
  backgroundSize: `${props.width}px ${props.height}px`,
  backgroundPosition: `-${props.x}px -${props.y}px`,
  opacity: `${props.isOver ? "0.2" : "1"}`,
  backgroundRepeat: "no-repeat",
  cursor: "move",
});