import { useState } from 'react';
import { Link } from 'react-router-dom';
import { USER_SETTINGS_ROUTE } from '../../utils/consts';
import s from './style.module.css';

const Modal = ({visible, children}) => {
    let displayVisible = 'none';
    if (visible) {
        displayVisible = 'flex'
    }
    return (
        <div className={s.Modal} style={{display: displayVisible}}>
            <div className={s.ModalContent} >
                Пазл собран! Ваше время:  {children}
                <Link to={USER_SETTINGS_ROUTE}><button className={s.Button}>Завершить игру</button></Link>
            </div>      
        </div>
    )
}

export default Modal