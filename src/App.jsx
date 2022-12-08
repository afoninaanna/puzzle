import { onAuthStateChanged } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import AppRouter from './components/AppRouter';
import { auth } from './firebase';

function App() {
    const [user, setUser] = useState(null);
    useEffect(() => {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          setUser(user);
        } 
        else {
          setUser(null);
        }
      });
    }, []);
    return (
      <BrowserRouter>
        <div className="App">
          <AppRouter user={user}/>
        </div>
      </BrowserRouter>
    );
}

export default App;
