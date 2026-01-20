import { useState } from 'react'; 
import Sidebar from './Sidebar'; 
import { useLocation } from 'react-router-dom'; 
import { motion, AnimatePresence } from 'framer-motion'; 

const MainLayout = ({ children }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    window.location.href = "/";
  };

 
  const pageTransition = {
    initial: { opacity: 0, y: 20, scale: 0.98 }, 
    animate: { opacity: 1, y: 0, scale: 1 },     
    exit: { opacity: 0, y: -20, scale: 0.98 },   
    transition: { duration: 0.4, ease: [0.25, 1, 0.5, 1] } 
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
          overflow-x-hidden
        `}
      >
        {/* Sayfalar (dashboard -home-detail) */}
        <div className="max-w-7xl mx-auto w-full h-full">
           <AnimatePresence mode="wait">
             <motion.div
               key={location.pathname} 
               initial={pageTransition.initial}
               animate={pageTransition.animate}
               exit={pageTransition.exit}
               transition={pageTransition.transition}
               className="w-full h-full"
             >
               {children}
             </motion.div>
           </AnimatePresence>
        </div>
      </main>
    </div>
  );
};

export default MainLayout;