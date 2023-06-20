import './App.css';

import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from "react-redux";
import React, { useState, useEffect } from 'react';

import LoginPage from './components/LoginPage';
import { AppState } from './types/states';
import Navbar from './components/Navbar';
import ShoppingForm from './components/ShoppingForm';
import ShoppingList from './components/ShoppingList';



function App() {

  const stateSelector = (state:AppState) => state;
  const state = useSelector(stateSelector);
  
  let message = ""
  
  if(state.login.loading) {
    message = "Loading ..."
  }
  if(state.shopping.error) {
    message = state.shopping.error
  }
  if(state.login.error) {
    message = state.login.error
  }

  if(state.login.isLogged){
    return (
      <div className="App">
        <Navbar/>
        <h4 style={{height:40}}>{message}</h4>
        <Routes>
          <Route path='/' element={<ShoppingList />} />
          <Route path='/form' element={<ShoppingForm />} />
          <Route path='*' element={<Navigate to="/" />} />
        </Routes>
      </div>
    );
  } else {
    return (
      <div className="App">
        <Navbar />
        <h4 style={{height:40}}>{message}</h4>
        <Routes>
          <Route path='/' element={<LoginPage />} />
          <Route path='*' element={<Navigate to="/" />} />
        </Routes>
        
      </div>
    );
  }

  
}

export default App;
