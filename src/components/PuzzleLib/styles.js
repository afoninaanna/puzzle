export const puzzleWrapperStyles = (props) => ({
    gridArea: "f",
    display: 'flex',
    flexWrap: 'wrap',
    padding: 0,
    width: `${props.width}px`,
    height: `${props.height}px`
});

export const puzzlePieceStyles = (props) => ({
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