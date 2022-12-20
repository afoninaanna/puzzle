import React, { useState, useEffect } from "react";
import s from "./style.module.css";
import { app, auth, database } from "../../firebase";
import { getDatabase, ref, child, get, set, onValue } from "firebase/database";

const Difficulty = (props) => {
  const [state, setState] = useState([]);
  const [difficulty, setDifficulty] = useState("");
  const [numOfFragVertical, setNumOfFragVertical] = useState("");
  const [numOfFragHorizontal, setNumOfFragHorizontal] = useState("");
  const [fragmentType, setFragmentType] = useState("");
  const [assemblyType, setAssemblyType] = useState("");

  console.log("STATE")
  console.log(state)
  // console.log("difficulty")
  // console.log(difficulty)
  // console.log("numOfFragVertical")
  // console.log(numOfFragVertical)
  // console.log("numOfFragHorizontal")
  // console.log(numOfFragHorizontal)
  // console.log("fragmentType")
  // console.log(fragmentType)
  // console.log("assemblyType")
  // console.log(assemblyType)

  const changedDifficulty = (e) => {
    setDifficulty(e)
    const currentDifficulty = state?.find((dif) => dif[0] === e);
    setNumOfFragVertical(currentDifficulty[1].numOfFragVertical)
    setNumOfFragHorizontal(currentDifficulty[1].numOfFragHorizontal)
    setFragmentType(currentDifficulty[1].fragmentType)
    setAssemblyType(currentDifficulty[1].assemblyType)
  }

  useEffect(() => {
    readFromDatabase();
  }, []);

  const readFromDatabase = () => {
    onValue(ref(database), (snapshot) => {
      setState([])
      const tempData = snapshot.val();
      if (tempData) {
        Object.entries(tempData.difficulty).map((difficulty) => {
          setState((oldArray) => [...oldArray, difficulty]);
        });
      }
    });

    // const dbRef = ref(getDatabase());
    // get(child(dbRef, `difficulty`)).then((snapshot) => {
    //   if (snapshot.exists()) {
    //     const tempData = snapshot.val();
    //     if (tempData) {
    //       Object.entries(tempData).map((difficulty) => {
    //         setState((oldArray) => [...oldArray, difficulty]);
    //       });
    //     }
    //   } else {
    //     console.log("No data available");
    //   }
    // }).catch((error) => {
    //   console.error(error);
    // });
  }

  const writeToDatabase = () => {
    set(ref(database, `difficulty/${difficulty}`), {
      numOfFragVertical,
      numOfFragHorizontal,
      fragmentType,
      assemblyType,
    });
  };

  return (
    <div>
      <p style={{ marginBottom: 20 + "px" }}>
        <strong>Настройка уровня сложности</strong>
      </p>
      <form className={s.Field}>
        <p>Выбор уровня сложности</p>
        <select
          value={difficulty}
          onChange={(e) => changedDifficulty(e.target.value)}
        >
          {state.map((state) => (
            <option>{state[0]}</option>
          ))}
        </select>
      </form>
      <form className={s.Field}>
        <p>
          Количество фрагментов
          <br />
          по вертикали
        </p>
        <input
          type="range"
          max="10"
          min="4"
          value={numOfFragVertical}
          onChange={(e) => setNumOfFragVertical(e.target.value)}
        ></input>
      </form>
      <form className={s.Field}>
        <p>
          Количество фрагментов
          <br />
          по горизонтали
        </p>
        <input
          type="range"
          max="10"
          min="4"
          value={numOfFragHorizontal}
          onChange={(e) => setNumOfFragHorizontal(e.target.value)}
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
