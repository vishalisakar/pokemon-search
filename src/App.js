import React, { Fragment }  from 'react';
import style from './App.module.css';

import MainPage from './pages/main/MianPage'

function App() {
  return (
    <Fragment>
      <div className={style.backgorundLayout}></div>
      <MainPage></MainPage>
    </Fragment>
  );
}

export default App;
