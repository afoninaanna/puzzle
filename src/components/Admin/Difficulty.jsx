import React from 'react'
import s from './style.module.css';

const Difficulty = (props) => {
  return (
    <div>
        <p style={{marginBottom: 20 + "px"}}><strong>Настройка уровня сложности</strong></p>
        <form action='' className={s.Field}>
          <p>Выбор уровня сложности</p>
          <select>
            <option>Легкий</option>
            <option>Средний</option>
            <option>Сложный</option>
          </select>
        </form>
        <form className={s.Field}>
            <p>Количество фрагментов<br/>по вертикали</p>
            <input type="range" max="10" min="4"></input>
        </form>
        <form className={s.Field}>
            <p>Количество фрагментов<br/>по горизонтали</p>
            <input type="range" max="10" min="4"></input>
        </form>
        <form action='' className={s.Field}>
          <p>Вид фрагментов</p>
          <select>
            <option>Прямоугольные</option>
            <option>Треугольные</option>
          </select>
        </form>
        <form action='' className={s.Field}>
          <p>Тип сборки</p>
          <select>
            <option>На поле</option>
            <option>На ленте</option>
          </select>
        </form>
        <button className={s.Button}>Применить</button>
        <button onClick={() => props.onSelectComponent("")} className={s.Button}>Закрыть</button>
    </div>
  )
}

export default Difficulty