import React, { useState }  from 'react'
import s from './style.module.css';
import Buttons from './Buttons';
import Difficulty from './Difficulty';
import CreateGame from './CreateGame';

const Admin = () => {
  const [component, setComponent] = useState('');
  
  function handleComponent(comp) {
    setComponent(comp);
  }

  console.log()
  return (
    <div className={s.Page}>
      <div className={s.Container}>
        {component == "difficulty"
        ? <Difficulty onSelectComponent={handleComponent}/>
        : component == "create"
        ? <CreateGame onSelectComponent={handleComponent}/>
        : <Buttons onSelectComponent={handleComponent}/>
        }
      </div>
    </div>
  )
}

export default Admin