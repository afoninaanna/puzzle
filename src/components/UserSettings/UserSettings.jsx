import { signOut } from 'firebase/auth';
import React, { useState, useEffect } from 'react'
import s from './style.module.css';
import { PUZZLE_ROUTE } from '../../utils/consts';
import { Link, Navigate } from 'react-router-dom';
import { app, auth, database } from "../../firebase";
import loading from "../../img/loading.gif";
import { getDatabase, ref, child, get, set, onValue } from "firebase/database";

const UserSettings = () => {
  const [difficulties, setDifficulties] = useState([]);
  const [difficulty, setDifficulty] = useState("");
  const [puzzles, setPuzzles] = useState([])
  const [puzzlesForCurrentDifficulty, setPuzzlesForCurrentDifficulty] = useState([]);
  const [currentPuzzle, setCurrentPuzzle] = useState("");

  const [puzzleParams, setPuzzleParams] = useState({
    numOfFragVertical: 0,
    numOfFragHorizontal: 0,
    fragmentType: "",
    assemblyType: "",
    imageUrl: "",
    positions: [],
    countMethod: "",
  });

  const changeDifficulty = (e) => {
    setDifficulty(e)
    setCurrentPuzzle([])
    setPuzzleParams({
      ...puzzleParams,
      numOfFragVertical: 0,
      numOfFragHorizontal: 0,
      fragmentType: "",
      assemblyType: "",
      imageUrl: "",
      positions: [],
    });
    const currentDifficulty = difficulties?.find((difficulty) => difficulty[0] === e);
    const curPuzzles = puzzles?.filter(
      (puzzle) => puzzle[1].difficulty === currentDifficulty[0]
    );
    setPuzzlesForCurrentDifficulty(curPuzzles);
  };

  const readDifficultyFromDatabase = () => {
    onValue(ref(database), (snapshot) => {
      setPuzzles([]);
      setDifficulties([]);
      const tempData = snapshot.val();
      if (tempData) {
        Object.entries(tempData.difficulty).map((difficulty) => {
          setDifficulties((oldArray) => [...oldArray, difficulty]);
        });
        Object.entries(tempData.puzzles).map((puzzle) => {
          setPuzzles((oldArray) => [...oldArray, puzzle]);
        });
      }
    });
  };

  const getPuzzleParams = (e) => {
    const puzzleData = puzzlesForCurrentDifficulty.filter(
      (puzzle) => puzzle[0] === currentPuzzle
    );
    if(currentPuzzle!=""){
      if(puzzleData){
        setPuzzleParams({
          ...puzzleParams,
          assemblyType: puzzleData[0][1].assemblyType,
          fragmentType: puzzleData[0][1].fragmentType,
          numOfFragHorizontal: puzzleData[0][1].numOfFragHorizontal,
          numOfFragVertical: puzzleData[0][1].numOfFragVertical,
          imageUrl: puzzleData[0][1].image,
          positions: puzzleData[0][1].positions,
        });
      }
    }
  }

  useEffect(() => {
    getPuzzleParams(currentPuzzle);
  }, [currentPuzzle]);

  useEffect(() => {
    readDifficultyFromDatabase();
  }, [])


  function handleLogOut() {
    signOut(auth);
  }
  return (
    <div className={s.Page}>
      {difficulties.length === 0 ? (
        <img src={loading} alt="puzzle"></img>
      ) : (
        <div className={s.Container}>
          <p style={{ marginBottom: 20 + "px" }}>
            <strong>Параметры игры «Puzzle»</strong>
          </p>
          <form action="" className={s.Field}>
            <p>Выбор уровня сложности</p>
            <select
              value={difficulty}
              onChange={(e) => changeDifficulty(e.target.value)}
              required
            >
              <option defaultValue disabled></option>
              {difficulties.map((difficulty) => (
                <option>{difficulty[0]}</option>
              ))}
            </select>
          </form>
          <form action="" className={s.Field}>
            <p>Выбор игры</p>
            <select>
              <option defaultValue disabled></option>
              <option>Новая</option>
              <option>Существующая</option>
            </select>
          </form>
          <form className={s.Field}>
            <p>Способ подсчета результата</p>
            <select
              value={puzzleParams.countMethod}
              onChange={(e) =>
                setPuzzleParams({
                  ...puzzleParams,
                  countMethod: e.target.value,
                })
              }
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
              onChange={function (e) {
                setCurrentPuzzle(e.target.value);
              }}
              required
            >
              <option defaultValue disabled></option>
              {puzzlesForCurrentDifficulty.map((puzzles) => (
                <option>{puzzles[0]}</option>
              ))}
            </select>
          </form>
          {difficulty != "" &&
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