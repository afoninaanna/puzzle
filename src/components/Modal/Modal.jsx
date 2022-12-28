import { useState } from 'react';
import { Link } from 'react-router-dom';
import s from './style.module.css';

const Modal = ({visible, children}) => {
    let displayVisible = 'none';
    if (visible) {
        displayVisible = 'flex'
    }
    return (
      <div className={s.Modal} style={{ display: displayVisible }}>
        <div className={s.ModalContent}>
          {children}
        </div>
      </div>
    );
}

export default Modal