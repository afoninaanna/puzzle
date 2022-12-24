import React, { useState } from 'react'
import { auth } from '../../firebase';
import s from './style.module.css';
import { signInWithEmailAndPassword } from "firebase/auth";
import { Link } from 'react-router-dom';
import { REGISTER_ROUTE } from '../../utils/consts';
import { DEVELOPERS_ROUTE } from '../../utils/consts'

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  function logIn() {
    signInWithEmailAndPassword(auth, email, password);
  }

  return (
    <div className={s.Page}>
      <Link to={DEVELOPERS_ROUTE}>
        <div className={s.Help}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#000000"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <circle cx="12" cy="12" r="10" />
            <path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3" />
            <line x1="12" y1="17" x2="12.01" y2="17" />
          </svg>
          Сведения о разработчиках и системе
        </div>
      </Link>
      <div className={s.Container}>
        <p style={{ marginBottom: 20 + "px" }}>Логин</p>
        <div className={s.Field}>
          <p>Email</p>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Введите логин"
            className={s.Input}
            required
          />
        </div>
        <br />
        <div className={s.Field}>
          <p>Пароль</p>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Введите пароль"
            className={s.Input}
            required
          />
          {password.length < 6 ? (
            <span style={{ fontSize: 12 }}>
              Пароль должен содержать
              <br />
              минимум 6 символов
            </span>
          ) : (
            <span></span>
          )}
        </div>
        <button onClick={logIn} className={s.Login}>
          Войти
        </button>
        <p className={s.Register}>
          Впервые тут? <Link to={REGISTER_ROUTE}>Зарегистрироваться</Link>
        </p>
      </div>
    </div>
  );
}

export default Login