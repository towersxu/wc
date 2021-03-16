import React, { useState, useEffect, useRef } from 'react';

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
  useEffect(() => {
    document.querySelector('#cancel').addEventListener('click', closeHander);
    return () => document.querySelector('#cancel').removeEventListener('click', closeHander);
  });

  return (
    <div className="App">
      <button onClick={activateLasers}>
        打开弹框
      </button>
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
