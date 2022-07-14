import React from 'react';
import { Route, Switch } from 'react-router-dom';

import './App.css';

import WelcomePage from './pages/WelcomePage';
import ProductPage from './pages/ProductPage';
import MaterialPage from './pages/MaterialPage';
import IngredientPage from './pages/IngredientPage';

function App() {
  return (
    <Switch>
      <Route exact path="/" component={ WelcomePage } />
      <Route exact path="/products" component={ ProductPage } />
      <Route exact path="/materials" component={ MaterialPage } />
      <Route exact path="/ingredients" component={ IngredientPage } />
    </Switch>
  );
}

export default App;
