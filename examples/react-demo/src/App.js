import React, { useState, useEffect, useRef } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const [visible, setVisible] = useState(false);
  const dialogEl = useRef(null);

  const activateLasers = () => {
    setVisible(true)
  }

  const closeHander = () => {
    setVisible(false)
  }

  useEffect(() => {
    dialogEl.current.addEventListener("close", closeHander);
    return () => dialogEl.current.removeEventListener("close", closeHander);
  });
  
  // useEffect(() => {
  //   document.querySelector('#cancel').addEventListener('click', closeHander);
  //   return () => document.querySelector('#cancel').removeEventListener('click', closeHander);
  // });

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <button onClick={activateLasers}>
          Activate Lasers
        </button>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      <wc-dialog visible={visible} ref={dialogEl}>
        <div slot="content">
          <input type="text"/>
          <div className="st">
            用户须知
          </div>
          <button id="cancel" onClick={closeHander}>取消</button>
        </div>
      </wc-dialog>
    </div>
  );
}

export default App;
