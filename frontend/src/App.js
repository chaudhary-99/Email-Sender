// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DesignEmailForm from './components/DesignEmailForm';
import SendEmailForm from './components/SendEmailForm';
import Header from './components/Header';
import Footer from './components/Footer';
import './App.css';

const App = () => {
  return (
    <Router>
      <div className="App">
        <Header />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<DesignEmailForm />} />
            <Route path="/send" element={<SendEmailForm />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
