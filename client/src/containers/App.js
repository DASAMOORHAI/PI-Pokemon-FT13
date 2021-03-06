import React from 'react';
import { Route } from 'react-router-dom';
import  { Provider } from 'react-redux';
import store from '../store.js';
import LandingPage from '../components/LandingPage.jsx';
import Home from '../components/Home.jsx';
import Pokemon from '../components/Pokemon.jsx';
import CreatePoke from '../components/CreatePoke.jsx';

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Route exact path='/'>
          <LandingPage />
        </Route>
        <Route exact path='/pokemon'>
          <Home />
        </Route>
        <Route exact path='/pokemon/info/:idPokemon'>
          <Pokemon />
        </Route>
        <Route exact path='/pokemon/crear'>
          <CreatePoke />
        </Route>
      </div>
    </Provider>
  );
}

export default App;
