import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Main from './Components/Main/Main';

function App() {
  return (
    <div className="App">
      <Router>
      <Routes>
        <Route path='/' exact element={<Main />} /> 
      </Routes>

      </Router>
    </div>
  );
}

export default App;
