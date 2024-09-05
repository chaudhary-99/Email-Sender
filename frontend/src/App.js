import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DesignEmailForm from './components/DesignEmailForm';
import SendEmailForm from './components/SendEmailForm';
import './App.css';

const App = () => {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<DesignEmailForm />} />
          <Route path="/send" element={<SendEmailForm />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
