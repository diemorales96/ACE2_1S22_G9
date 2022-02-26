import React from 'react'
import {BrowserRouter as Router, Routes ,Route } from 'react-router-dom';
import { createBrowserHistory } from 'history';

import BarChart from './components/BarChart'
import Exp2 from './components/experimento2'
import Exp3 from './components/experimento3'
import Co2 from './components/Co2'
import {Navbar} from './components/navbar'
import {Home} from './components/home'
import './App.css'


const hist = createBrowserHistory();

function App ()  {
  return (
    <Router>
      <div className="app-container">
        <Navbar></Navbar>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/1" element={<BarChart/>} />
          <Route path="/2" element={<Exp2/>} />
          <Route path="/3" element={<Exp3/>} />
          <Route path="/4" element={<Co2/>} />
        </Routes>
       
      </div>
    </Router>

  );
}

export default App
