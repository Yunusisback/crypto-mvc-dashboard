import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import HeaderView from './views/HeaderView';
import ProtectedRoute from './components/ProtectedRoute';
import LoginPageController from './controllers/LoginPageController';
import MainPageController from './controllers/MainPageController';
import DetailController from './controllers/DetailController';
import RegisterPageController from './controllers/RegisterPageController';

function AppContent() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("isLoggedIn") === "true"
  );
  const [isLoginMode, setIsLoginMode] = useState(true);
  const location = useLocation();

  useEffect(() => {
    localStorage.setItem("isLoggedIn", isLoggedIn);
  }, [isLoggedIn]);

  useEffect(() => {
    // URL değiştiğinde isLoginMode'u ayarla
    if (location.pathname === '/register') {
      setIsLoginMode(false);
    } else {
      setIsLoginMode(true);
    }
  }, [location.pathname]);

  return (
    <>
      <HeaderView 
        isLoggedIn={isLoggedIn} 
        setIsLoggedIn={setIsLoggedIn} 
        setIsLoginMode={setIsLoginMode} 
      />
      
      <Routes>
        {/* Giriş ve kayıt sayfasını tek bir rotada yönetiyoruz */}
        <Route 
          path="/" 
          element={
            <LoginPageController 
              setIsLoggedIn={setIsLoggedIn} 
              isLoginMode={isLoginMode} 
              setIsLoginMode={setIsLoginMode} 
            />
          } 
        />
        
        <Route
          path="/register"
          element={<Navigate to="/" replace />}
        />

        <Route 
          path="/home" 
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <MainPageController />
            </ProtectedRoute>
          } 
        />
        
        <Route 
          path="/coin/:id" 
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <DetailController />
            </ProtectedRoute>
          } 
        />
        
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;