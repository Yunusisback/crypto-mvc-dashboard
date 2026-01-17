import { useState } from 'react'; 
import Sidebar from './Sidebar'; 
import { useNavigate } from 'react-router-dom';

const MainLayout = ({ children }) => {
  const navigate = useNavigate();

 
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    window.location.href = "/";
  };

  return (
    <div className="flex min-h-screen bg-bg-dark text-white font-sans">

      <Sidebar 
        handleLogout={handleLogout} 
        isCollapsed={isCollapsed} 
        toggleSidebar={toggleSidebar}
      />

      <main 
        className={`flex-1 p-4 md:p-8 overflow-x-hidden transition-all duration-300 ease-in-out
        ${isCollapsed ? 'lg:ml-24' : 'lg:ml-80'}`}
      >

        {/* Sayfalar (dashboard -home-detail) */}
        <div className="max-w-7xl mx-auto">
           {children}
        </div>
      </main>
    </div>
  );
};

export default MainLayout;