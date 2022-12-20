import React, { useState } from 'react'
import s from './style.module.css';
import Puzzle from '../PuzzleLib/Puzzle'
import { shuffle} from './../PuzzleLib/utils.js';

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
          width={500}
          height={400}
          piecesX={10}
          piecesY={10}
          onComplete={onComplete}
        />
        <div className={s.Tape}></div>
      </div>
      
    </div>
  );
}

export default CreateGame