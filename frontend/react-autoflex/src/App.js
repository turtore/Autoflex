import React from 'react';
import { Route, Switch } from 'react-router-dom';

import './App.css';

import WelcomePage from './pages/WelcomePage';
import ProductPage from './pages/ProductPage';
import MaterialPage from './pages/MaterialPage';
import ProductDetailsPage from './pages/ProductDetailsPage';

function App() {
  return (
    <Switch>
      <Route exact path="/" component={ WelcomePage } />
      <Route exact path="/products" component={ ProductPage } />
      <Route exact path="/products/:id" component={ ProductDetailsPage } />
      <Route exact path="/materials" component={ MaterialPage } />
    </Switch>
  );
}

export default App;
