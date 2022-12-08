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
    <div className={s.Container}>
      <p>Register</p>
      <p>
        <strong>Email</strong>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type='text'
          placeholder='Введите логин' />
      </p>
      <br />
      <p>
        <strong>Пароль</strong>
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type='text'
          placeholder='Введите пароль' />
      </p>
      <button onClick={register}>Зарегистрироваться и войти</button>
      <Link to={LOGIN_ROUTE}><button>Логин</button></Link>
    </div>
  )
}

export default Register