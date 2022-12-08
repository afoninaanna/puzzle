import React, { useState } from 'react'
import { auth } from '../../firebase';
import s from './style.module.css';
import { signInWithEmailAndPassword } from "firebase/auth";
import { Link} from 'react-router-dom';
import { REGISTER_ROUTE } from '../../utils/consts';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  function logIn() {
    signInWithEmailAndPassword(auth, email, password);
  }

  return (
    <div className={s.Container}>
        <p>Логин</p>
        <p>
          <strong>Email</strong>
          <input 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type='text' 
            placeholder='Введите логин'/>
        </p>
        <br/>
        <p>
          <strong>Пароль</strong>
          <input 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type='text' 
            placeholder='Введите пароль' />
        </p>
        <button onClick={logIn}>Войти</button>
        <Link to={REGISTER_ROUTE}><button>Зарегистрироваться</button></Link>
    </div>
  )
}

export default Login