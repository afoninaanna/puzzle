import React, { useState, useEffect }  from 'react'
import s from './style.module.css';
import Buttons from './Buttons';
import Difficulty from './Difficulty';
import CreateGame from './CreateGame';
import loading from '../../img/loading.gif'
import { app, auth, database } from "../../firebase";
import { getDatabase, ref, child, get, set, onValue } from "firebase/database";
import HelpButton from '../Info/HelpButton/HelpButton';

const Admin = () => {
  const [difficulties, setDifficulties] = useState([]);
  const [component, setComponent] = useState('');
  
  function handleComponent(comp) {
    setComponent(comp);
  }

  const readDifficultyFromDatabase = () => {
    onValue(ref(database), (snapshot) => {
      setDifficulties([])
      const tempData = snapshot.val();
      if (tempData) {
        Object.entries(tempData.difficulty).map((difficulty) => {
          setDifficulties((oldArray) => [...oldArray, difficulty]);
        });
      }
    });
  }

  useEffect(() => {
    readDifficultyFromDatabase();
  }, []);


  return (
    <div className={s.Page}>
      {difficulties.length === 0 ? (
        <img src={loading} alt="puzzle"></img>
      ) : (
        <div className={s.Container}>
          <HelpButton/>
          {component === "difficulty"
          ? <Difficulty onSelectComponent={handleComponent} difficulties={difficulties}/>
          : component === "create"
          ? <CreateGame onSelectComponent={handleComponent} difficulties={difficulties}/>
          : <Buttons onSelectComponent={handleComponent}/>
          }
        </div>
      )}
    </div>
  )
}

export default Admin