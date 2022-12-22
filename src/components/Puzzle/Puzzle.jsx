import { signOut } from 'firebase/auth';
import React, {useEffect, useState} from 'react'
import { useLocation } from "react-router-dom";
import s from './style.module.css';
import { auth } from '../../firebase';
import soundOn from '../../img/soundOn.svg'
import save from '../../img/save.svg'
import imageView from '../../img/imageView.svg'
import PuzzleSquareUser from "../PuzzleLib/PuzzleSquareUser";
import Draggable from "react-draggable";
import close from "../../img/close.svg"
import Modal from '../Modal/Modal';
import { Howl } from "howler";
let audio = null;
const Puzzle = () => {
  const location = useLocation();
  const [puzzleParams, setPuzzleParams] = useState(location.state.puzzleParams);
  const [displayHint, setDisplayHint] = useState("none");
  const [time, setTime] = useState({seconds: 0, minutes: 0, hours: 0});
  const [visible, setVisible] = useState(false);

  const onComplete = () => {
    console.log("Puzzle is completed!");
    setVisible(true);
    clearTimeout(timerId)
  };
  
  const soundClick = () => {
    if (audio != null) {
      audio.stop();
      audio.unload();
      audio = null;
    } else {
      audio = new Howl({
        src: "/3d20874f20174bd.mp3",
        loop: true,
        volume: 0.5,
      });
      audio.play();
    }
  };

  const hintClick = () => {
    if (displayHint=="flex"){
      setDisplayHint("none")
    } else if (displayHint == "none") {
      setDisplayHint("flex");
    } else {
      setDisplayHint("none");
    }
  }
  let timerId;
  useEffect(() => {
    timerId = setTimeout(() => setTime ({...time, seconds: time.seconds + 1}), 1000);
    if (time.seconds === 60) {
      setTime({...time, seconds: 0, minutes: time.minutes + 1});
    }
    if (time.minutes === 60) {
      setTime({...time, minutes: 0, hours: time.hours + 1});
    }
  }, [time]);

  const formatTime = [
    '0' + time.hours,
    ':',
    '0' + time.minutes,
    ':',
    '0' + time.seconds
  ]

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
            <p className={s.Time}>{formatTime.map((elem) => elem.slice(-2))}</p>
          ) : puzzleParams.countMethod == "На очки" ? (
            <p className={s.Score}>0</p>
          ) : null}
        </div>
        <div onClick={soundClick}>
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
      <Modal visible={visible} setVisible={setVisible}>
        {formatTime.map((elem) => elem.slice(-2))}
      </Modal>
    </div>
  );
}

export default Puzzle