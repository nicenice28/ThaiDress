import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import ThaiDressList from './components/ThaiDressList';
import ThaiDressForm from './components/ThaiDressForm';
import ProtectedRoute from './components/ProtectedRoute';
import Header from './components/Header';
import './index.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/dresses"
          element={
            <ProtectedRoute>
              <div className="app-container">
                <Header />
                <div className="content-container">
                  <ThaiDressForm />
                  <ThaiDressList />
                </div>
              </div>
            </ProtectedRoute>
          }
        />
        <Route path="/" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
