import { signOut } from 'firebase/auth';
import React from 'react'
import s from './style.module.css';
import { auth } from '../../firebase';
import { PUZZLE_ROUTE } from '../../utils/consts';
import { Link, Navigate } from 'react-router-dom';

const UserSettings = () => {
  function handleLogOut() {
    signOut(auth);
  }
  return (
    <div className={s.Page}>
      <div className={s.Container}>
        <p style={{marginBottom: 20 + "px"}}>Параметры игры «Puzzle»</p>
        <form action='' className={s.Field}>
          <p>Выбор уровня сложности</p>
          <select>
            <option>Легкий</option>
            <option>Средний</option>
            <option>Сложный</option>
          </select>
        </form>
        <form action='' className={s.Field}>
          <p>Выбор игры</p>
          <select>
            <option>Новая</option>
            <option>Существующая</option>
          </select>
        </form>
        <form action='' className={s.Field}>
          <p>Способ подсчета результата</p>
          <select>
            <option>Не ведется</option>
            <option>На очки</option>
            <option>На время</option>
          </select>
        </form>
        <form action='' className={s.Field}>
          <p>Игра</p>
          <select>
            <option></option>
          </select>
        </form>
        <Link to={PUZZLE_ROUTE} style={{width: 100+"%"}}><button className={s.Button}>Начать игру</button></Link>
        <button onClick={handleLogOut} className={s.Button}>Выйти из аккаунта</button>
      </div>
    </div>
  )
}

export default UserSettings