import { signOut } from 'firebase/auth';
import React from 'react'
import s from './style.module.css';
import { auth } from '../../firebase';


const Buttons = (props) => {
    function handleLogOut() {
        signOut(auth);
      }
    return (
        <div>
            <p style={{marginBottom: 20 + "px"}}><strong>Панель администратора</strong></p>
            <button onClick={() => props.onSelectComponent("difficulty")} className={s.Button}>Настроить уровень сложности</button>
            <button onClick={() => props.onSelectComponent("create")} className={s.Button}>Создать игру</button>
            <button onClick={handleLogOut} className={s.Button}>Выйти из аккаунта</button>
        </div>
    )
}

export default Buttons