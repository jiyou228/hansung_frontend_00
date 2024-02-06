import React, {useEffect } from 'react';
import logo from '../assets/black_jobhak_full.svg';
import './styles.css'; // CSS 파일 import
import {useNavigate } from 'react-router-dom';
import text from '../assets/가장 혁신적인 취업툴.svg';
function App() {
    const navigate = useNavigate();
  useEffect(() => {
    const timer = setTimeout(() => {
        navigate('/home');
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="container">
        <div className='first'>
          <img src = {text} alt='text'/>
        </div>

        <div className='second'>
          <img src={logo} alt='logo' />
        </div>
    </div>
  );
}

export default App;
