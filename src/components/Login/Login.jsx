import React from 'react'
import s from './style.module.css';

const Login = () => {
  return (
    <div className={s.loginContainer}>
        <p>
          <strong>Логин</strong>
          <input type='text' placeholder='Введите логин'/>
        </p>
        <br/>
        <p>
          <strong>Пароль</strong>
          <input type='text' placeholder='Введите пароль' />
        </p>
        <button>Войти</button>
        <button>Зарегистрироваться</button>
    </div>
  )
}

export default Login