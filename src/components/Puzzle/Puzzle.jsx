import { signOut } from 'firebase/auth';
import React, {useState} from 'react'
import { useLocation } from "react-router-dom";
import s from './style.module.css';
import { auth } from '../../firebase';
import soundOn from '../../img/soundOn.svg'
import save from '../../img/save.svg'
import imageView from '../../img/imageView.svg'
import PuzzleSquareUser from "../PuzzleLib/PuzzleSquareUser";
import Draggable from "react-draggable";
import close from "../../img/close.svg"

const onComplete = () => {
  console.log("Puzzle is completed!");
};




const Puzzle = () => {

  const location = useLocation();
  const [puzzleParams, setPuzzleParams] = useState(location.state.puzzleParams);
  const [displayHint, setDisplayHint] = useState("none");
  console.log(location);
  const hintClick = () => {
    if (displayHint=="flex"){
      setDisplayHint("none")
    } else if (displayHint == "none") {
      setDisplayHint("flex");
    } else {
      setDisplayHint("none");
    }
  }

  function handleLogOut() {
    signOut(auth);
  }
  return (
    <div className={s.Page}>
      <Draggable
        defaultPosition={{ x: 400, y: 100 }}
        bounds={{ left: 0, top: 0, right: 1100, bottom: 600 }}
      >
        <div className={s.Hint} style={{ display: displayHint, zIndex: 99 }}>
          <img className={s.HintImg} src={puzzleParams.imageUrl}></img>
          <img onClick={hintClick} className={s.Close} src={close}></img>
        </div>
      </Draggable>
      <div className={s.Params}>
        <div>
          {puzzleParams.countMethod == "На время" ? (
            <p className={s.Time}>00:00:00</p>
          ) : puzzleParams.countMethod == "На очки" ? (
            <p className={s.Score}>0</p>
          ) : (null)}
        </div>
        <div>
          <img id="sound" src={soundOn}></img>
          <label htmlFor="sound">Звук</label>
        </div>
        <div>
          <img id="save" src={save}></img>
          <label htmlFor="save">Сохранение</label>
        </div>
        <div onClick={hintClick}>
          <img id="imageView" src={imageView}></img>
          <label htmlFor="imageView">Подсказка</label>
        </div>
        <button onClick={handleLogOut} className={s.Exit}>
          Выйти из аккаунта
        </button>
      </div>
      <div className={s.Puzzle}>
        <PuzzleSquareUser
          image={puzzleParams.imageUrl}
          width={810}
          height={600}
          piecesX={puzzleParams.numOfFragHorizontal}
          piecesY={puzzleParams.numOfFragVertical}
          onComplete={onComplete}
          positions={puzzleParams.positions}
        />
      </div>
      <div className={s.Tape}></div>
    </div>
  );
}

export default Puzzle