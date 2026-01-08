import Sidebar from './Sidebar'; 
import { useNavigate } from 'react-router-dom';


const MainLayout = ({ children }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    window.location.href = "/";
  };

  return (
    <div className="flex min-h-screen bg-[#050505] text-white font-sans">

      {/* Sabit Sidebar  */}
      <Sidebar handleLogout={handleLogout} />

      {/* Sağ değişen içerik alanı */}
      <main className="flex-1 lg:ml-64 p-4 md:p-8 overflow-x-hidden">

        {/* Sayfalar (dashboard -home-detail) */}
        <div className="max-w-7xl mx-auto">
           {children}
        </div>
      </main>
    </div>
  );
};

export default MainLayout;