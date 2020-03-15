import React, { Fragment, useReducer, useContext, useEffect } from 'react'
import style from "./MainPage.module.css";

import { Switch, Route, BrowserRouter } from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.min.css';

// import for pages
import HomePage from '../home/HomePage'
import DetailPage from '../detail/DetailPage'
import ComparePage from '../compare/ComparePage'

// import components
import Header from '../../components/header/Header'

import Context from '../../store/context';
import reducer from '../../store/reducer';
import usePokemonState from '../../store/usePokemonStore';

function MainPage() {

  const state = usePokemonState();
  // const [ state , dispatch ] = useReducer(reducer, initialState);

  useEffect(() => {
    getAllPokeman();
  }, [state.pokemonList.length === 0]);

  const getAllPokeman = async () => {
    const url = 'https://pokeapi.co/api/v2/pokemon/?offset=0&limit=1000';
    const response = await fetch(url);
    const jsonRes = await response.json();
    jsonRes.results.forEach( type => {
      const urlSplit = type.url.split('/');
      let num = urlSplit[urlSplit.length -2];
      type['id'] = num;
    });
    state.action({type:'SET_POKEMON_LIST', payload: jsonRes.results });
  }
    return (
        <Fragment>
        <div className={style.gridContainer}>
          <BrowserRouter >
          <Context.Provider value={ state } >
            <div className={style.header}>
              <Header />
            </div>
  
            <div className={style.pages}>
              
              <Switch>
                <Route path="/" exact  component={HomePage} />
                <Route path="/detail" component={DetailPage} />
                <Route path="/compare" component={ComparePage} />
              </Switch>
            </div>
            </Context.Provider>
          </BrowserRouter>
        </div>
      </Fragment>
    );
}

export default MainPage;