import { NavLink } from 'react-router-dom';
import { FiGrid, FiPieChart, FiCreditCard, FiSettings, FiLogOut } from "react-icons/fi";
import { BiCoinStack } from "react-icons/bi";


const Sidebar = ({ handleLogout }) => {
  const menuItems = [
    { icon: <FiGrid />, label: 'Dashboard', path: '/dashboard' },
    { icon: <FiPieChart />, label: 'Piyasalar', path: '/home' },
    { icon: <FiCreditCard />, label: 'Cüzdan', path: '/wallet' },
    { icon: <FiSettings />, label: 'Ayarlar', path: '/settings' },
  ];

  return (
    <div className="hidden lg:flex flex-col w-64 h-screen fixed left-0 top-0 bg-black border-r border-gray-900 px-6 py-8 z-50 text-white">
      
      {/* Logo */}
      <div className="flex items-center gap-3 mb-12 px-2">
        <div className="w-10 h-10 bg-yellow-400 rounded-xl flex items-center justify-center text-black text-xl shadow-lg shadow-yellow-400/20">
          <BiCoinStack />
        </div>
        <h1 className="text-xl font-bold tracking-wide">Coin<span className="text-yellow-400">Vault</span></h1>
      </div>

      {/* Menü */}
      <nav className="flex-1 space-y-4">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => `
              flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all duration-300 font-medium
              ${isActive 
                ? 'bg-yellow-400 text-black shadow-lg shadow-yellow-400/20 font-bold' 
                : 'text-gray-400 hover:text-white hover:bg-white/10'}
            `}
          >
            <span className="text-xl">{item.icon}</span>
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>

      {/* logout */}
      <button 
        onClick={handleLogout}
        className="flex items-center gap-4 px-4 py-3 text-gray-400 hover:text-red-500 transition-colors mt-auto cursor-pointer"
      >
        <FiLogOut size={20} />
        <span className="font-medium">Çıkış Yap</span>
      </button>
    </div>
  );
};

export default Sidebar;