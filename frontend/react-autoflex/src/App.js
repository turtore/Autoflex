import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom'
import './App.css';

import WelcomePage from './pages/WelcomePage';
import ProductPage from './pages/ProductPage';
import MaterialPage from './pages/MaterialPage';
import ProductDetailsPage from './pages/ProductDetailsPage';
import Context from './context/Context';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" exact element={ <WelcomePage /> } />
        <Route path="/products" exact element={ <ProductPage /> } />
        <Route path="/products/:id" exact element={ <ProductDetailsPage /> } />
        <Route path="/materials" exact element={ <MaterialPage /> } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
