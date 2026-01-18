import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  FiGrid, FiCreditCard, FiSettings, FiLogOut,
  FiRepeat, FiClock, FiGlobe, FiHelpCircle,
  FiChevronLeft, FiChevronRight 
} from "react-icons/fi";
import { BiTrendingUp } from "react-icons/bi"; 

const Sidebar = ({ handleLogout, isCollapsed, toggleSidebar }) => {
  const { t } = useTranslation();


  const menuGroups = [
    {
      title: t('main_platform'),
      items: [
        { 
          icon: <FiGrid />, 
          label: t('dashboard'), 
          path: '/dashboard',
          activeColor: 'text-yellow-400',
          activeBg: 'bg-yellow-400/10',
          activeBorder: 'border-yellow-400/50',
          shadow: 'shadow-yellow-400/20'
        },
        { 
          icon: <BiTrendingUp />, 
          label: t('markets'), 
          path: '/home',
          activeColor: 'text-rose-500',
          activeBg: 'bg-rose-500/10',
          activeBorder: 'border-rose-500/50',
          shadow: 'shadow-rose-500/20'
        }, 
        { 
          icon: <FiGlobe />, 
          label: t('news'), 
          path: '/news',
          activeColor: 'text-sky-400',
          activeBg: 'bg-sky-500/10',
          activeBorder: 'border-sky-500/50',
          shadow: 'shadow-sky-500/20'
        },
      ]
    },
    {
      title: t('financial_assets'),
      items: [
        { 
          icon: <FiCreditCard />, 
          label: t('wallet'), 
          path: '/wallet',
          activeColor: 'text-emerald-400',
          activeBg: 'bg-emerald-500/10',
          activeBorder: 'border-emerald-500/50',
          shadow: 'shadow-emerald-500/20'
        },
        { 
          icon: <FiRepeat />, 
          label: t('swap'), 
          path: '/swap',
          activeColor: 'text-violet-400',
          activeBg: 'bg-violet-500/10',
          activeBorder: 'border-violet-500/50',
          shadow: 'shadow-violet-500/20'
        },
        { 
          icon: <FiClock />, 
          label: t('history'), 
          path: '/history',
          activeColor: 'text-orange-400',
          activeBg: 'bg-orange-500/10',
          activeBorder: 'border-orange-500/50',
          shadow: 'shadow-orange-500/20'
        },
      ]
    },
    {
      title: t('preferences'),
      items: [
        { 
          icon: <FiSettings />, 
          label: t('settings'), 
          path: '/settings',
          activeColor: 'text-white',
          activeBg: 'bg-white/10',
          activeBorder: 'border-white/50',
          shadow: 'shadow-white/20'
        },
        { 
          icon: <FiHelpCircle />, 
          label: t('help'), 
          path: '/help',
          activeColor: 'text-pink-400',
          activeBg: 'bg-pink-500/10',
          activeBorder: 'border-pink-500/50',
          shadow: 'shadow-pink-500/20'
        },
      ]
    }
  ];

  return (
    <aside 
      className={`
        flex flex-col h-screen fixed left-0 top-0 
        bg-[#09090b] text-gray-400
        border-r border-white/5 
        shadow-2xl shadow-black/50
        py-6 z-50 overflow-visible font-inter select-none
        transition-[width] duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] will-change-[width] transform-gpu
        ${isCollapsed ? 'w-20 px-3' : 'w-72 px-4'}
      `}
    >

      {/* Toggle Butonu  */}
      <button 
        onClick={toggleSidebar}
        className="absolute -right-3 top-20 w-6 h-6 bg-[#18181b] border border-white/10 rounded-full flex items-center justify-center text-gray-400 hover:text-white hover:border-yellow-400 hover:scale-110 transition-all cursor-pointer z-50 shadow-lg"
      >
        {isCollapsed ? <FiChevronRight size={12} /> : <FiChevronLeft size={12} />}
      </button>

       {/* -logo alanı */}
      <div className="flex items-center justify-center mb-10 relative z-10 h-16 w-full">
        <div className="relative w-full h-full flex items-center justify-center">
            
            {/* Büyük Logo */}
            <img 
              src="/vault2.png" 
              alt="CryptoVault" 
              className={`absolute transition-all duration-500 ease-out object-contain
                ${isCollapsed 
                  ? 'opacity-0 scale-75 pointer-events-none blur-sm' 
                  : 'opacity-100 scale-100 h-12 w-auto' 
                } 
              `} 
            />

            {/* Küçük Logo */}
            <img 
              src="/logo21.jpg" 
              alt="Mini Logo" 
              className={`absolute transition-all duration-500 ease-out object-cover rounded-xl shadow-lg border border-white/10
                ${isCollapsed 
                  ? 'opacity-100 scale-100 w-10 h-10' 
                  : 'opacity-0 scale-50 pointer-events-none rotate-180' 
                } 
              `} 
            />
        </div>
      </div>

       {/* nav */}
      <nav className="
        flex-1 space-y-8 overflow-y-auto overflow-x-hidden
        [scrollbar-width:none] 
        [-ms-overflow-style:none] 
        [&::-webkit-scrollbar]:hidden
      ">
        {menuGroups.map((group, idx) => (
          <div key={idx}>

            {/* Grup Başlığı */}
            <div className={`overflow-hidden transition-all duration-500 ${isCollapsed ? 'max-h-0 opacity-0 mb-0' : 'max-h-10 opacity-100 mb-2'}`}>
               <h3 className="text-[10px] font-bold text-gray-600 uppercase tracking-widest pl-4">
                {group.title}
               </h3>
            </div>

            <div className="space-y-1">
              {group.items.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) => `
                    relative flex items-center ${isCollapsed ? 'justify-center' : 'gap-3 px-3'} py-3 mx-auto
                    rounded-xl transition-all duration-300 group
                    ${isActive
                      ? `bg-white/5 border border-white/5 shadow-lg ${item.shadow}`
                      : 'hover:bg-white/5 hover:text-gray-200 border border-transparent'}
                  `}
                >
                  {({ isActive }) => (
                    <>
                      {/* İkon bg*/}
                      {isActive && (
                          <div className={`absolute inset-0 rounded-xl opacity-20 ${item.activeBg}`}></div>
                      )}

                      {/* İkon */}
                      <span 
                        className={`relative z-10 transition-all duration-300 flex items-center justify-center
                        ${isActive ? `${item.activeColor} scale-110` : 'text-gray-500 group-hover:text-gray-300'}
                        ${isCollapsed ? 'text-xl' : 'text-lg'}
                        `}
                      >
                        {item.icon}
                        
                      
                        {isActive && !isCollapsed && (
                            <div className={`absolute -inset-2 rounded-full blur-lg opacity-40 ${item.activeBg}`}></div>
                        )}
                      </span>

                      {/* Metin */}
                      <div className={`
                          overflow-hidden whitespace-nowrap transition-all duration-500 ease-in-out relative z-10
                          ${isCollapsed ? 'w-0 opacity-0' : 'w-auto opacity-100'}
                      `}>
                        <span className={`text-sm font-medium tracking-wide ${isActive ? 'text-white font-semibold' : ''}`}>
                          {item.label}
                        </span>
                      </div>
                      
                    
                      {isActive && !isCollapsed && (
                          <div className={`absolute right-2 w-1.5 h-1.5 rounded-full ${item.activeBg.replace('bg-', 'bg-')} ${item.activeColor.replace('text-', 'bg-')}`}></div>
                      )}
                    </>
                  )}
                </NavLink>
              ))}
            </div>
          </div>
        ))}
      </nav>

      {/* -logout */}
      <div className="mt-auto px-3 pt-6 pb-2">
        <div className={`border-t border-white/5 pt-4 ${isCollapsed ? 'flex justify-center' : ''}`}>
            <button
            onClick={handleLogout}
            className={`
                flex items-center ${isCollapsed ? 'justify-center w-10 h-10' : 'w-full gap-3 px-3 py-3'} 
                rounded-xl transition-all duration-300 group cursor-pointer
                hover:bg-red-500/10 hover:border-red-500/20 border border-transparent
            `}
            >
            <div className={`
                flex items-center justify-center transition-colors duration-300
                ${isCollapsed ? '' : 'w-8 h-8 rounded-lg bg-white/5 group-hover:bg-red-500/20'}
            `}>
                <FiLogOut size={18} className="text-gray-500 group-hover:text-red-400 transition-colors" />
            </div>
            
            <div className={`
                overflow-hidden whitespace-nowrap transition-all duration-500 ease-out
                ${isCollapsed ? 'w-0 opacity-0' : 'w-auto opacity-100'}
            `}>
                <div className="flex flex-col items-start">
                    <span className="text-sm font-semibold text-gray-400 group-hover:text-red-400 transition-colors">
                        {t('logout')}
                    </span>

                    {/* Alt metin*/}
                    <span className="text-[10px] text-gray-600 group-hover:text-red-400/60">Güvenli Çıkış</span>
                </div>
            </div>
            </button>
        </div>
      </div>
     
    </aside>
  );
};

export default Sidebar;