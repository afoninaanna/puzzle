import { signOut } from 'firebase/auth';
import React from 'react'
import { auth } from '../firebase';

const Puzzle = () => {
  function handleLogOut() {
    signOut(auth);
  }
  return (
    <div>
      <p>Puzzle</p>
      <button onClick={handleLogOut}>Выйти</button>
    </div>
  )
}

export default Puzzle