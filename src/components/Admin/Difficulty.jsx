import React, { useState, useEffect } from "react";
import s from "./style.module.css";
import { app, auth, database } from "../../firebase";
import { getDatabase, ref, child, get, set, onValue } from "firebase/database";

const Difficulty = (props) => {
  const [state, setState] = useState(props.difficulties);
  const [difficulty, setDifficulty] = useState("");
  const [numOfFragVertical, setNumOfFragVertical] = useState(0);
  const [numOfFragHorizontal, setNumOfFragHorizontal] = useState(0);
  const [fragmentType, setFragmentType] = useState("");
  const [assemblyType, setAssemblyType] = useState("");

  const changeDifficulty = (e) => {
    setDifficulty(e)
    const currentDifficulty = state?.find((dif) => dif[0] === e);
    setNumOfFragVertical(currentDifficulty[1].numOfFragVertical)
    setNumOfFragHorizontal(currentDifficulty[1].numOfFragHorizontal)
    setFragmentType(currentDifficulty[1].fragmentType)
    setAssemblyType(currentDifficulty[1].assemblyType)
  }

  const readDifficultyFromDatabase = () => {
    onValue(ref(database), (snapshot) => {
      setState([])
      const tempData = snapshot.val();
      if (tempData) {
        Object.entries(tempData.difficulty).map((difficulty) => {
          setState((oldArray) => [...oldArray, difficulty]);
        });
      }
    });
  }

  useEffect(() => {
    changeDifficulty(state[0][0])
    readDifficultyFromDatabase()
  }, []);

  const writeToDatabase = () => {
    set(ref(database, `difficulty/${difficulty}`), {
      numOfFragVertical,
      numOfFragHorizontal,
      fragmentType,
      assemblyType,
    });
    alert("Настройки сложности сохранены")
  };

  return (
    <div className={s.Anim}>
      <p style={{ marginBottom: 20 + "px" }}>
        <strong>Настройка уровня сложности</strong>
      </p>
      <form className={s.Field}>
        <p>Выбор уровня сложности</p>
        <select
          value={difficulty}
          onChange={(e) => changeDifficulty(e.target.value)}
        >
          {state.map((state) => (
            <option key={state[0]}>{state[0]}</option>
          ))}
        </select>
      </form>
      <form className={s.Field}>
        <p>
          Количество фрагментов
          <br />
          по горизонтали
        </p>
        <input
          type="number"
          max="10"
          min="4"
          step={fragmentType === 'Треугольные'? 2: 1}
          value={((fragmentType === 'Треугольные') && (numOfFragHorizontal % 2)) ? 6 : numOfFragHorizontal}
          onChange={(e) => setNumOfFragHorizontal(Number(e.target.value))}
        ></input>
      </form>
      <form className={s.Field}>
        <p>
          Количество фрагментов
          <br />
          по вертикали
        </p>
        <input
          type="number"
          max="10"
          min="4"
          step={fragmentType === 'Треугольные' ? 2 : 1} 
          value={((fragmentType === 'Треугольные') && (numOfFragVertical % 2)) ? 6 : numOfFragVertical}
          onChange={(e) => setNumOfFragVertical(Number(e.target.value))}
        ></input>
      </form>
      <form className={s.Field}>
        <p>Вид фрагментов</p>
        <select
          value={fragmentType}
          onChange={(e) => setFragmentType(e.target.value)}
        >
          <option>Прямоугольные</option>
          <option>Треугольные</option>
        </select>
      </form>
      <form className={s.Field}>
        <p>Тип сборки</p>
        <select
          value={assemblyType}
          onChange={(e) => setAssemblyType(e.target.value)}
        >
          <option>На поле</option>
          <option>На ленте</option>
        </select>
      </form>
      <button className={s.Button} onClick={writeToDatabase}>
        Применить
      </button>
      <button onClick={() => props.onSelectComponent("")} className={s.Button}>
        Закрыть
      </button>
    </div>
  );
};

export default Difficulty;
