import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import QuizInstructions from './components/quiz/QuizInstructions';
import tailwindConfig from './tailwind.config';
import Play from './components/quiz/Play';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/play/instructions" exact element={<QuizInstructions />} />
        <Route path="/play/quiz" exact element={<Play />} />
      </Routes>
    </Router>
  );
}

export default App;
