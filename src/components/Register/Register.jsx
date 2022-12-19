import { createUserWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { auth } from '../../firebase';
import { LOGIN_ROUTE } from '../../utils/consts';
import s from './style.module.css';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function register() {
    createUserWithEmailAndPassword(auth, email, password);
  }

  return (
    <div className={s.Page}>
      <div className={s.Container}>
        <p style={{marginBottom: 20 + "px"}}>Регистрация</p>
        <div className={s.Field}>
          <p>Email</p>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type='text'
            placeholder='Введите логин'
            className={s.Input} />
        </div>
        <br />
        <div className={s.Field}>
          <p>Пароль</p>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type='text'
            placeholder='Введите пароль'
            className={s.Input} />
        </div>
        <button onClick={register} className={s.Register}>Зарегистрироваться</button>
        <p className={s.Login}>
            Уже зарегистрированы? <Link to={LOGIN_ROUTE}>Войти</Link>
        </p>
      </div>
    </div>
  )
}

export default Register