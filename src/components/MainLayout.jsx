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
    <div className="flex min-h-screen bg-[#09090b] text-white font-sans select-none overflow-hidden">

      <Sidebar 
        handleLogout={handleLogout} 
        isCollapsed={isCollapsed} 
        toggleSidebar={toggleSidebar}
      />

      <main 
        className={`
          flex-1 p-4 md:p-8 
          transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)]
          ${isCollapsed ? 'ml-20' : 'ml-72'} 
        `}
      >
        {/* Sayfalar (dashboard -home-detail) */}
        <div className="max-w-7xl mx-auto w-full">
           {children}
        </div>
      </main>
    </div>
  );
};

export default MainLayout;