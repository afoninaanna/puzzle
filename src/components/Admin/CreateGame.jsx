import React from 'react'
import s from './style.module.css';
import Puzzle from '../PuzzleLib/Puzzle'

const onComplete = () => {
  console.log('Puzzle is completed!');
};

const CreateGame = (props) => {
  return (
    <div>
      <p style={{ marginBottom: 20 + "px" }}>
        <strong>Создание игры</strong>
      </p>
      <form className={s.Field}>
        <p>Изображение</p>
        <input type="file"></input>
      </form>
      <form action="" className={s.Field}>
        <p>Выбор уровня сложности</p>
        <select>
          <option>Легкий</option>
          <option>Средний</option>
          <option>Сложный</option>
        </select>
      </form>
      <div className={s.Puzzle}>
        <Puzzle
          image="https://www.laurag.tv/wp-content/uploads/2020/02/bob-esponja.jpg"
          width={534}
          height={400}
          pieces={5}
          onComplete={onComplete}
        />
        <div className={s.Tape}></div>
      </div>
      <div style={{ display: "flex", gap: 10 + "px" }}>
        <button
          className={s.Button}
          style={{ paddingLeft: 50 + "px", paddingRight: 50 + "px" }}
        >
          Перемешать
        </button>
        <button
          className={s.Button}
          style={{ paddingLeft: 50 + "px", paddingRight: 50 + "px" }}
        >
          Сохранить
        </button>
      </div>
      <button onClick={() => props.onSelectComponent("")} className={s.Button}>
        Закрыть
      </button>
    </div>
  );
}

export default CreateGame