import React, { useState } from 'react'
import { auth } from '../../firebase';
import s from './style.module.css';
import { signInWithEmailAndPassword } from "firebase/auth";
import { Link } from 'react-router-dom';
import { REGISTER_ROUTE } from '../../utils/consts';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  function logIn() {
    signInWithEmailAndPassword(auth, email, password);
  }

  return (
    <div className={s.Container}>
        <p style={{marginBottom: 20 + "px"}}>Логин</p>
        <div className={s.Field}>
          <p>Email</p>
          <input 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type='text' 
            placeholder='Введите логин'
            className={s.Input} />
        </div>
        <br/>
        <div className={s.Field}>
          <p>Пароль</p>
          <input 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type='password' 
            placeholder='Введите пароль'
            className={s.Input} />
        </div>
        <button onClick={logIn} className={s.Login}>Войти</button>
        <p className={s.Register}>
          Впервые тут? <Link to={REGISTER_ROUTE}>Зарегистрироваться</Link>
        </p>
    </div>
  )
}

export default Login