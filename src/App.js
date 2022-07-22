import React from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import Home from './features/home/Home';
import Leaderboard from './features/leaderboard/Leaderboard';
import NewQuestion from './features/newQuestion/NewQuestion';
import Question from './components/Question';
import Header from './components/Header';
import Preview from './features/preview/Preview';
import './App.css';

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <div className="container mx-auto">
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/leaderboard" element={<Leaderboard />} />
            <Route exact path="/add" element={<NewQuestion />} />
            <Route exact path="/preview/:id" element={<Preview />} />
            <Route exact path="/question/:id" element={<Question />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
