import React from 'react'
import s from './style.module.css';

const CreateGame = (props) => {
  return (
    <div>
        <p style={{marginBottom: 20 + "px"}}><strong>Создание игры</strong></p>
        <form className={s.Field}>
            <p>Изображение</p>
            <input type="file"></input>
        </form>
        <form action='' className={s.Field}>
          <p>Выбор уровня сложности</p>
          <select>
            <option>Легкий</option>
            <option>Средний</option>
            <option>Сложный</option>
          </select>
        </form>
        <div className={s.Puzzle}>
          <div className={s.Canvas}>
            <div>
            </div>
          </div>
          <div className={s.Tape}>
          </div>
        </div>
        <div style={{display: "flex", gap: 10+"px"}}>
          <button className={s.Button} style={{paddingLeft: 50+"px", paddingRight:50+"px"}}>Перемешать</button>
          <button className={s.Button} style={{paddingLeft: 50+"px", paddingRight:50+"px"}}>Сохранить</button>
        </div>
        <button onClick={() => props.onSelectComponent("")} className={s.Button}>Закрыть</button>
    </div>
  )
}

export default CreateGame