import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  FiGrid, FiSettings, FiLogOut,
  FiRepeat, FiClock, FiGlobe, FiHelpCircle,
  FiChevronLeft, FiChevronRight, FiPieChart
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
          activeColor: 'text-[#FFD700]',
          activeBg: 'bg-[#FFD700]/10',
        },
        { 
          icon: <BiTrendingUp />, 
          label: t('markets'), 
          path: '/home',
          activeColor: 'text-rose-500',
          activeBg: 'bg-rose-500/10',
        }, 
        { 
          icon: <FiGlobe />, 
          label: t('news'), 
          path: '/news',
          activeColor: 'text-sky-400',
          activeBg: 'bg-sky-500/10',
        },
      ]
    },
    {
      title: t('financial_assets'),
      items: [
        { 
          icon: <FiPieChart />, 
          label: t('wallet'), 
          path: '/wallet',
          activeColor: 'text-emerald-400',
          activeBg: 'bg-emerald-500/10',
        },
        { 
          icon: <FiRepeat />, 
          label: t('swap'), 
          path: '/swap',
          activeColor: 'text-violet-400',
          activeBg: 'bg-violet-500/10',
        },
        { 
          icon: <FiClock />, 
          label: t('history'), 
          path: '/transactions', 
          activeColor: 'text-orange-400',
          activeBg: 'bg-orange-500/10',
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
          activeColor: 'text-gray-200',
          activeBg: 'bg-white/5',
        },
        { 
          icon: <FiHelpCircle />, 
          label: t('help'), 
          path: '/help',
          activeColor: 'text-pink-400',
          activeBg: 'bg-pink-500/10',
        },
      ]
    }
  ];

  return (
    <aside 
      className={`
        h-screen fixed left-0 top-0 
        bg-[#0a0a0a]/95 backdrop-blur-2xl 
        
        border-r border-white/10                  
        shadow-[1px_0_30px_rgba(255,255,255,0.05)]
      
        
        py-6 z-50 flex flex-col font-inter select-none
        overflow-visible
        
        transition-[width] duration-300 ease-in-out will-change-[width]
        ${isCollapsed ? 'w-24' : 'w-72'} 
      `}
    >
      {/* toggle butonu */}
      <button 
        onClick={toggleSidebar}
        className="absolute -right-3 top-20 w-6 h-6 bg-[#1a1a1a] border border-white/20 rounded-full flex items-center justify-center text-gray-200 hover:text-primary hover:border-primary hover:scale-110 transition-all cursor-pointer shadow-[0_0_15px_rgba(255,255,255,0.1)] z-60"
      >
        {isCollapsed ? <FiChevronRight size={14} /> : <FiChevronLeft size={14} />}
      </button>

      {/* Logo Alanı*/}
      <div className="flex flex-col items-center justify-center mb-8 h-20 w-full relative shrink-0">
         <div className="relative w-full h-full flex items-center justify-center">
            
            {/* Büyük Logo  */}
            <img 
                src="/vault2.png" 
                alt="Vault" 
                className={`h-14 w-auto object-contain drop-shadow-[0_0_10px_rgba(255,215,0,0.3)] absolute transition-all duration-300
                    ${isCollapsed ? 'opacity-0 scale-50 pointer-events-none' : 'opacity-100 scale-100'}
                `} 
            />
            
            {/* Küçük Logo  */}
            <img 
                src="/logo21.jpg" 
                alt="V" 
                className={`w-12 h-12 rounded-xl border border-white/10 shadow-lg object-cover absolute transition-all duration-300
                    ${isCollapsed ? 'opacity-100 scale-100' : 'opacity-0 scale-50 rotate-90 pointer-events-none'}
                `} 
            />
         </div>
      </div>

      {/*Menü Listesi */}
      <nav className="flex-1 space-y-6 overflow-y-auto overflow-x-hidden px-3 scrollbar-hide hover:overflow-y-auto">
        {menuGroups.map((group, idx) => (
          <div key={idx}>

            {/* Grup Başlığı */}
            <div className={`overflow-hidden transition-all duration-300 ${isCollapsed ? 'h-0 opacity-0 mb-0' : 'h-auto opacity-100 mb-2'}`}>
                <h3 className="text-[11px] font-bold text-yellow-600/80 uppercase tracking-widest pl-3 whitespace-nowrap">
                {group.title}
                </h3>
            </div>

            <div className="space-y-1">
              {group.items.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) => `
                    relative flex items-center ${isCollapsed ? 'justify-center w-14 h-14' : 'gap-3 px-3 py-3 w-full'} 
                    mx-auto rounded-xl transition-all duration-200 group
                    ${isActive ? '' : 'hover:bg-white/8 hover:shadow-[0_0_15px_rgba(255,255,255,0.05)]'}
                  `}
                >
                  {({ isActive }) => (
                    <>
                      {/* Aktif Arkaplan */}
                      {isActive && (
                        <div className={`absolute inset-0 rounded-xl border border-white/10 ${item.activeBg} shadow-[0_0_10px_rgba(0,0,0,0.5)]`}>
                            {!isCollapsed && <div className={`absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 rounded-r-full ${item.activeColor.replace('text-', 'bg-')} shadow-[0_0_8px_currentColor]`}></div>}
                        </div>
                      )}

                      {/* İkon */}
                      <span className={`
                        relative z-10 flex items-center justify-center transition-all duration-300
                        ${isCollapsed ? 'text-xl' : 'text-lg'}
                        ${isActive ? `${item.activeColor} scale-110 drop-shadow-md` : 'text-gray-400 group-hover:text-gray-200'}
                      `}>
                        {item.icon}
                      </span>

                      {/* Metin */}
                      <div className={`
                          whitespace-nowrap overflow-hidden transition-all duration-300 ease-in-out
                          ${isCollapsed ? 'w-0 opacity-0' : 'w-auto opacity-100'}
                      `}>
                        <span className={`text-sm font-medium tracking-wide ${isActive ? 'text-white font-semibold' : 'text-gray-400 group-hover:text-gray-200'}`}>
                            {item.label}
                        </span>
                      </div>

                      {/* Tooltip  */}
                      {isCollapsed && (
                        <div className="absolute left-16 bg-[#1a1a1a] border border-white/10 text-white text-xs font-bold px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 transition-all duration-200 pointer-events-none whitespace-nowrap z-100 shadow-[0_0_15px_rgba(255,255,255,0.1)]">
                            {item.label}
                        </div>
                      )}
                    </>
                  )}
                </NavLink>
              ))}
            </div>
          </div>
        ))}
      </nav>

      {/* Çıkış Yap logout*/}
      <div className="mt-auto px-3 pt-4 pb-2">
        <div className="border-t border-white/10 pt-4">
            <button
            onClick={handleLogout}
            className={`
                flex items-center ${isCollapsed ? 'justify-center w-14 h-14' : 'w-full gap-3 px-3 py-3'} 
                rounded-xl transition-all duration-200 group cursor-pointer relative
                hover:bg-red-500/10 hover:border-red-500/20 border border-transparent
            `}
            >
                <div className={`
                    flex items-center justify-center transition-colors duration-300 relative z-10
                    ${isCollapsed ? '' : 'w-8 h-8 rounded-lg bg-white/5 group-hover:bg-red-500/20'}
                `}>
                    <FiLogOut size={isCollapsed ? 20 : 18} className="text-red-500 group-hover:text-red-400 transition-colors" />
                </div>
                
                <div className={`
                    flex flex-col items-start overflow-hidden whitespace-nowrap transition-all duration-300
                    ${isCollapsed ? 'w-0 opacity-0' : 'w-auto opacity-100'}
                `}>
                    <span className="text-sm font-semibold text-red-400 group-hover:text-red-600 transition-colors">
                        {t('logout')}
                    </span>
                    <span className="text-[10px] text-gray-600 group-hover:text-red-600/90"></span>
                </div>

                {isCollapsed && (
                    <div className="absolute left-16 bg-red-900/90 border border-red-500/90 text-white text-xs font-bold px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 transition-all duration-200 pointer-events-none whitespace-nowrap z-100 shadow-xl">
                        {t('logout')}
                    </div>
                )}
            </button>
        </div>
      </div>
      
    </aside>
  );
};

export default Sidebar;