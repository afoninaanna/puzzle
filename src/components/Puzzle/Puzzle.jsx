import { signOut } from 'firebase/auth';
import React from 'react'
import s from './style.module.css';
import { auth } from '../../firebase';
import soundOn from '../../img/soundOn.svg'
import save from '../../img/save.svg'
import imageView from '../../img/imageView.svg'

const Puzzle = () => {
  function handleLogOut() {
    signOut(auth);
  }
  return (
    <div className={s.Page}>
      <div className={s.Params}>
        <div>
          <p className={s.Time}>00:00:00</p>
          {/* <p className={s.Score}>0</p> */}
        </div>
        <div>
          <img id="sound" src={soundOn}></img>
          <label htmlFor="sound">Звук</label>
        </div>
        <div>
          <img id="save" src={save}></img>
          <label htmlFor="save">Сохранение</label>
        </div>
        <div>
          <img id="imageView" src={imageView}></img>
          <label htmlFor="imageView">Подсказка</label>
        </div>
        <button onClick={handleLogOut} className={s.Exit}>Выйти из аккаунта</button>
      </div>
      <div className={s.Canvas}>
        <div>
          
        </div>
      </div>
      <div className={s.Tape}>

      </div>
      

    </div>
  )
}

export default Puzzle