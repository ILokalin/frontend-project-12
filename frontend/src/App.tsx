import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import NotFoundPage from './Containers/NotFoundPage';
import LoginPage from './Containers/LoginPage';
import MainPage from './Containers/MainPage';
import './App.css';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route
          path="/login"
          element={<LoginPage />}
        />
        <Route
          path="/"
          element={<MainPage />}
        />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
}

export default App;
