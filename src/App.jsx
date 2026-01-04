
import  { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { GlobalProvider } from './context/GlobalContext';
import HeaderController from './controllers/HeaderController';
import LoginPageController from './controllers/LoginPageController';
import DashboardController from './controllers/DashboardController';
import MainPageController from './controllers/MainPageController';
import DetailController from './controllers/DetailController';
import ProtectedRoute from './components/ProtectedRoute';
import NotificationSystem from './views/components/NotificationSystem';

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
    if (location.pathname === '/register') {
      setIsLoginMode(false);
    } else {
      setIsLoginMode(true);
    }
  }, [location.pathname]);

  return (
    <>
      <HeaderController 
        isLoggedIn={isLoggedIn} 
        setIsLoggedIn={setIsLoggedIn} 
        setIsLoginMode={setIsLoginMode} 
      />
      
      <NotificationSystem />
      
      <Routes>
   
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
          path="/dashboard" 
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <DashboardController />
            </ProtectedRoute>
          } 
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
    <GlobalProvider>
      <Router>
        <AppContent />
      </Router>
    </GlobalProvider>
  );
}

export default App;