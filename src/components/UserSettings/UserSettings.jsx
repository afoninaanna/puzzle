import { signOut } from 'firebase/auth';
import React, { useState, useEffect } from 'react'
import s from './style.module.css';
import { PUZZLE_ROUTE } from '../../utils/consts';
import { Link, Navigate } from 'react-router-dom';
import { app, auth, database } from "../../firebase";
import loading from "../../img/loading.gif";
import { getDatabase, ref, child, get, set, onValue } from "firebase/database";

const UserSettings = () => {
  const [difficulties, setDifficulties] = useState([]); //Это все уровни сложности
  const [puzzles, setPuzzles] = useState([]); //Это пазлы которые сохранял администратор
  const [savedPuzzles, setSavedPuzzles] = useState([]); //Это пазлы которые сохраняли пользователи

  const [currentDifficulty, setCurrentDifficulty] = useState(""); //Это выбранная сложность
  const [gameType, setGameType] = useState(""); //Это выбранный тип игры

  const [currentPuzzles, setCurrentPuzzles] = useState([]); // Это все пазлы по выбранному уровню сложности и типу игры
  const [currentPuzzle, setCurrentPuzzle] = useState(""); // Это выбранный пазл в выпадающем списке

  const [puzzleParams, setPuzzleParams] = useState({})

  const [countMethod, setCountMethod] = useState("")
  console.log(puzzleParams);

  const readDataFromDatabase = () => {
    setDifficulties([]);
    setPuzzles([]);
    setSavedPuzzles([]);
    onValue(ref(database), (snapshot) => {
      const tempData = snapshot.val();
      Object.entries(tempData.difficulty).map((difficulty) => {
        setDifficulties((oldArray) => [...oldArray, difficulty]);
      });
      Object.entries(tempData.puzzles).map((difficulty) => {
        setPuzzles((oldArray) => [...oldArray, difficulty]);
      });
      Object.entries(tempData.savedPuzzle).map((savedPuzzle) => {
        setSavedPuzzles((oldArray) => [...oldArray, savedPuzzle]);
      });
    });
  };

  useEffect(() => {
    readDataFromDatabase();
  }, []);

  useEffect(() => {
    setPuzzleParams({})
    setCurrentPuzzles([]);
    setCurrentPuzzle("");
    try {
      if (gameType == "Новая") {
        const curPuzzles = puzzles?.filter(
          (puzzle) => puzzle[1].difficulty === currentDifficulty
        );
        setCurrentPuzzles(curPuzzles);
        // console.log("НОВАЯ");
      } else if (gameType == "Существующая") {
        let uid = auth.currentUser.uid;
        const curUser = savedPuzzles?.filter((user) => user[0] === uid);
        const curPuzzles = Object.entries(curUser[0][1])?.filter(
          (puzzle) => puzzle[1].difficulty === currentDifficulty
        );
        setCurrentPuzzles(curPuzzles);
        // console.log("СУЩЕСТВУЮЩАЯ");
      }
    } catch (e) {
      alert("Существующие игры отсутствуют");
    }
  }, [currentDifficulty, gameType]);

  const getPuzzleParams = (e) => {
    try {
      if (gameType == "Новая") {
        const puzzleData = puzzles.filter(
          (puzzle) => puzzle[0] === currentPuzzle
        );
        if (currentPuzzle != "") {
          if (puzzleData) {
            setPuzzleParams({
              ...puzzleParams,
              difficulty: puzzleData[0][1].difficulty,
              assemblyType: puzzleData[0][1].assemblyType,
              fragmentType: puzzleData[0][1].fragmentType,
              numOfFragHorizontal: puzzleData[0][1].numOfFragHorizontal,
              numOfFragVertical: puzzleData[0][1].numOfFragVertical,
              imageUrl: puzzleData[0][1].image,
              positions: puzzleData[0][1].positions,
              countMethod,
            });
          }
        }
      } else if (gameType == "Существующая") {
        let uid = auth.currentUser.uid;
        const curUser = savedPuzzles?.filter((user) => user[0] === uid);
        const puzzleData = Object.entries(curUser[0][1])?.filter(
          (puzzle) => puzzle[0] === currentPuzzle
        );
        if (currentPuzzle != "") {
          if (puzzleData) {
            setPuzzleParams({
              ...puzzleParams,
              difficulty: puzzleData[0][1].difficulty,
              assemblyType: puzzleData[0][1].assemblyType,
              fragmentType: puzzleData[0][1].fragmentType,
              numOfFragHorizontal: puzzleData[0][1].numOfFragHorizontal,
              numOfFragVertical: puzzleData[0][1].numOfFragVertical,
              imageUrl: puzzleData[0][1].image,
              positions: puzzleData[0][1].positions,
              countMethod,
            });
          }
        }
      }
    } catch (e) {
      alert("Существующие игры отсутствуют");
    }
  }

  useEffect(() => {
    getPuzzleParams(currentPuzzle);
  }, [currentPuzzle, countMethod]);

  function handleLogOut() {
    signOut(auth);
  }
  return (
    <div className={s.Page}>
      {difficulties.length == 0 ? (
        <img src={loading} alt="puzzle"></img>
      ) : (
        <div className={s.Container}>
          <p style={{ marginBottom: 20 + "px" }}>
            <strong>Параметры игры «Puzzle»</strong>
          </p>
          <form action="" className={s.Field}>
            <p>Выбор уровня сложности</p>
            <select
              value={currentDifficulty}
              onChange={(e) => setCurrentDifficulty(e.target.value)}
              required
            >
              <option defaultValue disabled></option>
              {difficulties.map((difficulty) => (
                <option>{difficulty[0]}</option>
              ))}
            </select>
          </form>
          <form className={s.Field}>
            <p>Выбор игры</p>
            <select
              value={gameType}
              onChange={(e) => setGameType(e.target.value)}
              required
            >
              <option defaultValue disabled></option>
              <option>Новая</option>
              <option>Существующая</option>
            </select>
          </form>
          <form className={s.Field}>
            <p>Способ подсчета результата</p>
            <select
              value={countMethod}
              onChange={(e) => setCountMethod(e.target.value)}
              required
            >
              <option defaultValue disabled></option>
              <option>Не ведется</option>
              <option>На очки</option>
              <option>На время</option>
            </select>
          </form>
          <form className={s.Field}>
            <p>Игра</p>
            <select
              value={currentPuzzle}
              onChange={(e) => setCurrentPuzzle(e.target.value)}
              required
            >
              <option defaultValue disabled></option>
              {currentPuzzles.map((currentPuzzle) => (
                <option>{currentPuzzle[0]}</option>
              ))}
            </select>
          </form>
          {currentDifficulty != "" &&
          currentPuzzle != "" &&
          puzzleParams.countMethod != "" ? (
            <Link
              to={PUZZLE_ROUTE}
              style={{ width: 100 + "%" }}
              state={{ puzzleParams }}
            >
              <button className={s.Button}>Начать игру</button>
            </Link>
          ) : null}
          <button onClick={handleLogOut} className={s.Button}>
            Выйти из аккаунта
          </button>
        </div>
      )}
    </div>
  );
}

export default UserSettings