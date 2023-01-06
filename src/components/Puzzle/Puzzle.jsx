import { signOut } from 'firebase/auth';
import React, {useEffect, useState} from 'react'
import { useLocation, Link } from "react-router-dom";
import s from './style.module.css';
import { onAuthStateChanged } from "firebase/auth";
import { app, auth, database } from "../../firebase";
import { getDatabase, ref, child, get, set, update, onValue } from "firebase/database";
import soundOn from '../../img/soundOn.svg'
import soundOff from '../../img/soundOff.svg'
import save from '../../img/save.svg'
import imageView from '../../img/imageView.svg'
import PuzzleSquare from "../PuzzleLib/PuzzleSquare";
import Draggable from "react-draggable";
import close from "../../img/close.svg"
import Modal from '../Modal/Modal';
import { Howl } from "howler";
import { USER_SETTINGS_ROUTE } from "../../utils/consts";

let audio = null, timerId;
const Puzzle = () => {
  const location = useLocation();
  const [puzzleParams, setPuzzleParams] = useState(location.state.puzzleParams);
  const [displayHint, setDisplayHint] = useState("none");
  const [time, setTime] = useState(
    puzzleParams.gameType == "Существующая" &&
      puzzleParams.countMethod == "На время"
      ? !puzzleParams.time
        ? alert("Повреждённое сохранение (time error)")
        : {
            seconds: puzzleParams.time.seconds,
            minutes: puzzleParams.time.minutes,
            hours: puzzleParams.time.hours,
          }
      : { seconds: 0, minutes: 0, hours: 0 }
  ); //Если игра существующая и на время, то ставится время из сохранения, иначе 00:00:00
  const [score, setScore] = useState(
    puzzleParams.gameType == "Существующая" &&
      puzzleParams.countMethod == "На очки"
      ? puzzleParams.score
      : 0
  );
  const [visible, setVisible] = useState({
    modalSave: false,
    modalEnd: false,
  });
  const [isPlaying, setIsPlaying] = useState(false)
  const [savedPuzzleName, setSavedPuzzleName] = useState("")

  const onComplete = () => {
    //При завершении пазла модальное окно
    setVisible({...visible, modalEnd: true});
    clearTimeout(timerId)
  };

  const handleCurrentPositions = (value) => {
    //Запоминание нынешних позиций фрагментов
    puzzleParams.positions = value;
  };
  
  const writeToDatabase = () => {
    //Запись сохранения в БД
    set(
      ref(database, `savedPuzzle/${auth.currentUser.uid}/${savedPuzzleName}`),
      {
        positions: puzzleParams.positions,
        difficulty: puzzleParams.difficulty,
        image: puzzleParams.imageUrl,
        numOfFragVertical: puzzleParams.numOfFragVertical,
        numOfFragHorizontal: puzzleParams.numOfFragHorizontal,
        assemblyType: puzzleParams.assemblyType,
        fragmentType: puzzleParams.fragmentType,
        countMethod: puzzleParams.countMethod,
      }
    );
    if (puzzleParams.countMethod == "На время"){
      update(
        ref(database, `savedPuzzle/${auth.currentUser.uid}/${savedPuzzleName}`),
        {
          time,
        }
      );
    } else if (puzzleParams.countMethod == "На очки"){
      update(
        ref(database, `savedPuzzle/${auth.currentUser.uid}/${savedPuzzleName}`),
        {
          score,
        }
      );
    }
      setVisible({ ...visible, modalSave: false });
  }

  const soundClick = () => {
    //Включение/выключение звукового сопровождения
    if (audio != null) {
      audio.stop();
      audio.unload();
      audio = null;
      setIsPlaying(false)
    } else {
      audio = new Howl({
        src: "/3d20874f20174bd.mp3",
        loop: true,
        volume: 0.5,
      });
      audio.play();
      setIsPlaying(true)
    }
  };

  const hintClick = () => {
    //Подсказка
    if (displayHint=="flex"){
      setDisplayHint("none")
    } else if (displayHint == "none") {
      setDisplayHint("flex");
    } else {
      setDisplayHint("none");
    }
  }
  
  useEffect(() => {
    //timer
    if (puzzleParams.countMethod == "На время") {
      //Если игра на время, то запускается таймер, иначе не запускается
      timerId = setTimeout(
        () => setTime({ ...time, seconds: time.seconds + 1 }),
        1000
      );
      if (time.seconds === 60) {
        setTime({ ...time, seconds: 0, minutes: time.minutes + 1 });
      }
      if (time.minutes === 60) {
        setTime({ ...time, minutes: 0, hours: time.hours + 1 });
      }
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
    //logout
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
          {puzzleParams.countMethod == "На время" ? (
            <div style={{ width: 80, cursor: "default" }}><p className={s.Time}>{formatTime.map((elem) => elem.slice(-2))}</p></div>
          ) : puzzleParams.countMethod == "На очки" ? (
            <div style={{ width: 80, cursor: "default" }}><p className={s.Score}>{score}</p></div>
          ) : null}
        <div onClick={soundClick}>
          <img id="sound" src={isPlaying ? soundOn : soundOff}></img>
          <label htmlFor="sound">Звук</label>
        </div>
        <div onClick={() => setVisible({ ...visible, modalSave: true })}>
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
        <PuzzleSquare
          image={puzzleParams.imageUrl}
          width={810}
          height={600}
          piecesX={puzzleParams.numOfFragHorizontal}
          piecesY={puzzleParams.numOfFragVertical}
          onComplete={onComplete}
          positions={puzzleParams.positions}
          currentPos={handleCurrentPositions}
          score={score}
          setScore={setScore}
        />
      </div>
      <div className={s.Tape}></div>
      <Modal visible={visible.modalSave}>
        <div>
          <input
            type="text"
            style={{
              width: 100 + "%",
              minWidth: 100,
              borderWidth: "0 0 1px",
              outline: "none",
              backgroundSize: 18,
              fontFamily: "Inter",
              fontSize: "calc(var(--index) * 0.6)",
              paddingBottom: 5,
              marginTop: 5,
              marginBottom: 5,
              color: "#1d2120",
              transition: 0.2 + "s",
            }}
            placeholder="Введите название сохранения"
            value={savedPuzzleName}
            onChange={(e) => setSavedPuzzleName(e.target.value)}
          />
          {savedPuzzleName ? (
            <button className={s.Button} onClick={writeToDatabase}>
              Сохранить
            </button>
          ) : null}
          <button
            className={s.Button}
            onClick={() => setVisible({ ...visible, modalSave: false })}
          >
            Закрыть
          </button>
        </div>
      </Modal>
      <Modal visible={visible.modalEnd}>
        <p>Пазл собран! </p>
        {puzzleParams.countMethod === "На время"
          ? formatTime.map((elem) => elem.slice(-2))
          : null}
        <Link to={USER_SETTINGS_ROUTE}>
          <button className={s.Button}>Завершить игру</button>
        </Link>
      </Modal>
    </div>
  );
}

export default Puzzle