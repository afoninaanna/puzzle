import React, { useState, useEffect } from 'react'
import s from './style.module.css';
import Puzzle from '../PuzzleLib/PuzzleSquareAdmin'
import { app, auth, database, storage } from "../../firebase";
import { ref, get, set, onValue } from "firebase/database";
import { uploadBytes, ref as sRef, getDownloadURL } from "firebase/storage";

const onComplete = () => {
  console.log('Puzzle is completed!');
};

const CreateGame = (props) => {

  const [state, setState] = useState(props.difficulties);
  const [difficulty, setDifficulty] = useState("");
  const [image, setImage] = useState("");
  const [imageUrl, setImageUrl] = useState(null);
  const [puzzleName, setPuzzleName] = useState("");
  const [numOfFragVertical, setNumOfFragVertical] = useState(4);
  const [numOfFragHorizontal, setNumOfFragHorizontal] = useState(4);
  const [fragmentType, setFragmentType] = useState("");
  const [assemblyType, setAssemblyType] = useState("");

  const handlePos = (value) => {
    const imageRef = sRef(storage, `puzzles/${puzzleName}`);
    uploadBytes(imageRef, imageUrl).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
            set(ref(database, `puzzles/${puzzleName}`), {
              difficulty,
              image: url,
              positions: value,
              numOfFragVertical,
              numOfFragHorizontal,
              assemblyType,
              fragmentType,
            });
      });
    })
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
    <div>
      <p style={{ marginBottom: 20 + "px" }}>
        <strong>Создание игры</strong>
      </p>
      <form className={s.Field}>
        <p>Название игры</p>
        <input
          type="text"
          value={puzzleName}
          onChange={(e) => setPuzzleName(e.target.value)}
        ></input>
      </form>
      <form className={s.Field}>
        <p>Изображение</p>
        <input type="file" onChange={(e) => onImageChange(e)}></input>
      </form>
      <form className={s.Field}>
        <p>Выбор уровня сложности</p>
        <select
          value={difficulty}
          onChange={(e) => changeDifficulty(e.target.value)}
        >
          {state.map((state) => (
            <option>{state[0]}</option>
          ))}
        </select>
      </form>
      {
        (puzzleName && imageUrl)? (
          <div className={s.Puzzle}>
            <Puzzle
              image={image}
              width={540}
              height={400}
              piecesX={numOfFragHorizontal}
              piecesY={numOfFragVertical}
              onComplete={onComplete}
              onPos={handlePos}
            />
            <div className={s.Tape}></div>
            <button
              onClick={() => props.onSelectComponent("")}
              className={s.Button}
              style={{
                marginTop: 55 + "px",
                paddingLeft: 50 + "px",
                paddingRight: 50 + "px",
              }}
            >
              Закрыть
            </button>
          </div>
        ) : (
            <button
              onClick={() => props.onSelectComponent("")}
              className={s.Button}
              style={{
                marginTop: 55 + "px",
                paddingLeft: 50 + "px",
                paddingRight: 50 + "px",
              }}
            >
              Закрыть
            </button>
        )

      }
    </div>
  );
}

export default CreateGame