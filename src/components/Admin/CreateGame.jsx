import React, { useState, useEffect } from 'react'
import s from './style.module.css';
import PuzzleSquare from '../PuzzleLib/Square/PuzzleSquare'
import PuzzleTriangle from "../PuzzleLib/Triangle/PuzzleTriangle";
import { app, auth, database, storage } from "../../firebase";
import { ref, get, set, onValue } from "firebase/database";
import { uploadBytes, ref as sRef, getDownloadURL } from "firebase/storage";
import { HTML5Backend } from "react-dnd-html5-backend";
import loading from "../../img/loading.gif";

const onComplete = () => {
  //Затычка
};

const CreateGame = (props) => {
  const [state, setState] = useState(props.difficulties);
  const [difficulty, setDifficulty] = useState("");
  const [image, setImage] = useState("");
  const [imageUrl, setImageUrl] = useState(null);
  const [positions, setPositions] = useState([]); // Позиции сгенерированного пазла
  const [draggedElements, setDraggedElements] = useState([]); // Позиции на поле при режиме на ленте
  const [puzzleName, setPuzzleName] = useState("");
  const [numOfFragVertical, setNumOfFragVertical] = useState(4);
  const [numOfFragHorizontal, setNumOfFragHorizontal] = useState(4);
  const [fragmentType, setFragmentType] = useState("");
  const [assemblyType, setAssemblyType] = useState("");
  const [isShuffled, setIsShuffled] = useState(false);
  const [isSaving, setIsSaving] = useState(false)

  const writeToDatabase = () => {
    setIsSaving(true)
    //Запись игры в БД
    const imageRef = sRef(storage, `puzzles/${puzzleName}`);
    uploadBytes(imageRef, imageUrl).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        set(ref(database, `puzzles/${puzzleName}`), {
          difficulty,
          image: url,
          positions: positions,
          draggedElements: draggedElements ? draggedElements : null,
          numOfFragVertical,
          numOfFragHorizontal,
          assemblyType,
          fragmentType,
        });
        setPuzzleName("");
        setIsSaving(false);
        alert("Игра сохранена");
      });
    });
  };

  const handleCurrentPositions = (value) => {
    //Запоминание нынешних позиций фрагментов на поле, если режим на поле и на ленте, если режим на ленте
    setPositions(value);
  };
  const handleCurrentDraggedElements = (value) => {
    //Запоминание нынешних позиций фрагментов на поле, если режим на ленте
    setDraggedElements(value);
  };

  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      let reader = new FileReader();
      reader.onload = (e) => {
        setImage(e.target.result);
      };
      reader.readAsDataURL(event.target.files[0]);
    }
    setImageUrl(event.target.files[0]);
  };

  const changeDifficulty = (e) => {
    alert(
      "Не забудьте нажать на кнопку перемешать. Если хотите облегчить задачу игроку, то перемешивать не обязательно :)"
    );
    setDifficulty(e);
    const currentDifficulty = state?.find((dif) => dif[0] === e);
    setNumOfFragVertical(currentDifficulty[1].numOfFragVertical);
    setNumOfFragHorizontal(currentDifficulty[1].numOfFragHorizontal);
    setFragmentType(currentDifficulty[1].fragmentType);
    setAssemblyType(currentDifficulty[1].assemblyType);
  };

  const readDifficultyFromDatabase = () => {
    onValue(ref(database), (snapshot) => {
      setState([]);
      const tempData = snapshot.val();
      if (tempData) {
        Object.entries(tempData.difficulty).map((difficulty) => {
          setState((oldArray) => [...oldArray, difficulty]);
        });
      }
    });
  };

  useEffect(() => {
    changeDifficulty(state[0][0]);
    readDifficultyFromDatabase();
  }, []);

  return (
    <>
      {isSaving ? (
        <img src={loading} alt="puzzle"></img>
      ) : (
        <div className={s.Anim}>
          <p style={{ marginBottom: 20 + "px" }}>
            <strong>Создание игры</strong>
          </p>
          <form className={s.Field}>
            <p>Название игры</p>
            <input
              style={{ width: "60%" }}
              type="text"
              value={puzzleName}
              onChange={(e) => setPuzzleName(e.target.value)}
            ></input>
          </form>
          <form className={s.Field}>
            <p>Изображение</p>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => onImageChange(e)}
            ></input>
          </form>
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
          {puzzleName && imageUrl ? (
            <div>
              {fragmentType == "Прямоугольные" ? (
                <PuzzleSquare
                  image={image}
                  width={540}
                  height={400}
                  piecesX={numOfFragHorizontal}
                  piecesY={numOfFragVertical}
                  onComplete={onComplete}
                  currentPos={handleCurrentPositions}
                  currentDragPos={handleCurrentDraggedElements}
                  isShuffled={isShuffled}
                  setIsShuffled={setIsShuffled}
                  difficulty={difficulty}
                  assemblyType={assemblyType}
                />
              ) : (
                <PuzzleTriangle
                  image={image}
                  width={540}
                  height={400}
                  piecesX={numOfFragHorizontal}
                  piecesY={numOfFragVertical / 2}
                  onComplete={onComplete}
                  currentPos={handleCurrentPositions}
                  currentDragPos={handleCurrentDraggedElements}
                  isShuffled={isShuffled}
                  setIsShuffled={setIsShuffled}
                  difficulty={difficulty}
                  assemblyType={assemblyType}
                />
              )}
              <div style={{ display: "flex", gap: 10 + "px", gridArea: "b" }}>
                <button
                  // onClick={() => setPositions(shuffle(rootPositions))}
                  className={s.Button}
                  style={{ paddingLeft: 50 + "px", paddingRight: 50 + "px" }}
                  onClick={() => setIsShuffled(true)}
                >
                  Перемешать
                </button>
                <button
                  className={s.Button}
                  style={{
                    marginTop: 10 + "px",
                    paddingLeft: 50 + "px",
                    paddingRight: 50 + "px",
                  }}
                  onClick={writeToDatabase}
                >
                  Сохранить
                </button>
              </div>
            </div>
          ) : null}
          <button
            onClick={() => props.onSelectComponent("")}
            className={s.Button}
          >
            Закрыть
          </button>
        </div>
      )}
    </>
  );
}

export default CreateGame