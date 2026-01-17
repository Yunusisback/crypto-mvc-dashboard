import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { GlobalProvider } from './context/GlobalContext';
import LoginPageController from './controllers/LoginPageController';
import DashboardController from './controllers/DashboardController';
import MainPageController from './controllers/MainPageController';
import DetailController from './controllers/DetailController';
import ProtectedRoute from './components/ProtectedRoute';
import NotificationSystem from './components/ui/NotificationSystem';
import MainLayout from './components/MainLayout'; 

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
    } else if (location.pathname === '/') {
      setIsLoginMode(true);
    }
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-bg-dark text-white">
      
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
        
    
        <Route path="/register" element={<Navigate to="/" replace />} />

    
     
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <MainLayout>
                <DashboardController />
              </MainLayout>
            </ProtectedRoute>
          } 
        />

       
        <Route 
          path="/home" 
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <MainLayout>
                <MainPageController />
              </MainLayout>
            </ProtectedRoute>
          } 
        />
     
        <Route 
          path="/coin/:id" 
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <MainLayout>
                <DetailController />
              </MainLayout>
            </ProtectedRoute>
          } 
        />
        
     
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
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