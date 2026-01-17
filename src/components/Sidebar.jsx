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

  // Menü Grupları
  const menuGroups = [
    {
      title: t('main_platform'),
      items: [
        { 
          icon: <FiGrid />, 
          label: t('dashboard'), 
          path: '/dashboard',
          iconColor: 'text-yellow-400',
          hoverBg: 'hover:bg-yellow-500/10',
          activeClass: 'text-white bg-linear-to-r from-yellow-500/15 to-transparent',
          barColor: 'bg-yellow-400',
          glow: 'shadow-[0_0_15px_rgba(250,204,21,0.7)]'
        },
        { 
          icon: <BiTrendingUp />, 
          label: t('markets'), 
          path: '/home',
          iconColor: 'text-rose-500',
          hoverBg: 'hover:bg-rose-500/10',
          activeClass: 'text-white bg-linear-to-r from-rose-500/15 to-transparent',
          barColor: 'bg-rose-500',
          glow: 'shadow-[0_0_15px_rgba(244,63,94,0.7)]'
        }, 
        { 
          icon: <FiGlobe />, 
          label: t('news'), 
          path: '/news',
          iconColor: 'text-sky-400',
          hoverBg: 'hover:bg-sky-500/10',
          activeClass: 'text-white bg-linear-to-r from-sky-500/15 to-transparent',
          barColor: 'bg-sky-400',
          glow: 'shadow-[0_0_15px_rgba(56,189,248,0.7)]'
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
          iconColor: 'text-emerald-400',
          hoverBg: 'hover:bg-emerald-500/10',
          activeClass: 'text-white bg-linear-to-r from-emerald-500/15 to-transparent',
          barColor: 'bg-emerald-400',
          glow: 'shadow-[0_0_15px_rgba(52,211,153,0.7)]'
        },
        { 
          icon: <FiRepeat />, 
          label: t('swap'), 
          path: '/swap',
          iconColor: 'text-violet-400',
          hoverBg: 'hover:bg-violet-500/10',
          activeClass: 'text-white bg-linear-to-r from-violet-500/15 to-transparent',
          barColor: 'bg-violet-400',
          glow: 'shadow-[0_0_15px_rgba(167,139,250,0.7)]'
        },
        { 
          icon: <FiClock />, 
          label: t('history'), 
          path: '/history',
          iconColor: 'text-orange-400',
          hoverBg: 'hover:bg-orange-500/10',
          activeClass: 'text-white bg-linear-to-r from-orange-500/15 to-transparent',
          barColor: 'bg-orange-400',
          glow: 'shadow-[0_0_15px_rgba(251,146,60,0.7)]'
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
          iconColor: 'text-gray-300',
          hoverBg: 'hover:bg-gray-500/10',
          activeClass: 'text-white bg-linear-to-r from-gray-500/15 to-transparent',
          barColor: 'bg-white',
          glow: 'shadow-[0_0_15px_rgba(255,255,255,0.4)]'
        },
        { 
          icon: <FiHelpCircle />, 
          label: t('help'), 
          path: '/help',
          iconColor: 'text-pink-400',
          hoverBg: 'hover:bg-pink-500/10',
          activeClass: 'text-white bg-linear-to-r from-pink-500/15 to-transparent',
          barColor: 'bg-pink-400',
          glow: 'shadow-[0_0_15px_rgba(244,114,182,0.7)]'
        },
      ]
    }
  ];

  return (
    <aside 
   
      // 1. will-change-[width]  Tarayıcıya genişliğin değişeceğini önceden haber veriyoruz.

      // 2. transform-gpu İşlemi ekran kartına yıkarak CPU yu rahatlatıyoruz

      className={`flex flex-col h-screen fixed left-0 top-0 bg-linear-to-b from-gray-950 via-[#09090b] to-black backdrop-blur-2xl 
      border-r border-white/10 
      shadow-[4px_0_24px_0px_rgba(255,255,255,0.15),1px_0_0_0_rgba(255,255,255,0.1)]
      py-10 z-50 overflow-visible font-inter 
      transition-[width] duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] will-change-[width] transform-gpu
      ${isCollapsed ? 'w-20 md:w-24 px-4' : 'w-72 md:w-80 px-6 md:px-8'}`}
    >

      {/* Toggle Butonu */}
      <button 
        onClick={toggleSidebar}
        className="absolute -right-3 top-14 w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center text-black shadow-[0_0_15px_rgba(234,179,8,0.6)] hover:scale-110 transition-transform cursor-pointer z-50"
      >
        {isCollapsed ? <FiChevronRight size={14} /> : <FiChevronLeft size={14} />}
      </button>

       {/* logo alanı */}
       
      <div className="flex items-center justify-center mb-14 relative z-10 min-h-20">

       
        <div className="relative w-full h-20 flex items-center justify-center">
            
            {/* Büyük Logo */}
            <img 
              src="/vault2.png" 
              alt="CryptoVault Logo" 
              className={`absolute transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)]
                ${isCollapsed 
                  ? 'opacity-0 scale-50 pointer-events-none' 
                  : 'opacity-100 scale-100 h-16 md:h-20 w-auto' 
                } 
              `} 
            />

            {/* Küçük Logo */}
            <img 
              src="/logo21.jpg" 
              alt="CryptoVault Logo Small" 
              className={`absolute transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] object-contain rounded-2xl shadow-lg border border-white/10
                ${isCollapsed 
                  ? 'opacity-100 scale-100 w-10 h-10 md:w-12 md:h-12' 
                  : 'opacity-0 scale-50 pointer-events-none' 
                } 
              `} 
            />
        </div>
      </div>

       {/* Menü Navigasyonu */}
      <nav className="
        flex-1 space-y-10 overflow-y-auto -mr-4 pr-4 relative z-10
        [scrollbar-width:none] 
        [-ms-overflow-style:none] 
        [&::-webkit-scrollbar]:hidden
      ">
        {menuGroups.map((group, idx) => (
          <div key={idx}>

            {/* Başlık Animasyonu */}
            <div className={`overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] ${isCollapsed ? 'max-h-0 opacity-0' : 'max-h-10 opacity-100'}`}>
               <h3 className="text-[10px] font-extrabold text-gray-500 uppercase tracking-[0.2em] mb-5 pl-4 whitespace-nowrap">
                {group.title}
               </h3>
            </div>

            <div className="space-y-2">
              {group.items.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) => `
                    relative flex items-center ${isCollapsed ? 'justify-center px-0' : 'gap-4 px-4'} py-4 rounded-[1.2rem] 
                    transition-all duration-300 group
                    ${isActive
                      ? item.activeClass + ' shadow-[inset_0px_1px_0px_0px_rgba(255,255,255,0.05)]'
                      : `text-gray-400 ${item.hoverBg} hover:translate-x-1`}
                  `}
                >
                  {({ isActive }) => (
                    <>
                      {/* Sol aktif çubuğu  */}
                      <div className={`absolute left-0 top-1/2 -translate-y-1/2 h-3/5 w-1 rounded-r-full ${item.barColor} ${item.glow} transition-opacity duration-300 ${isActive && !isCollapsed ? 'opacity-100' : 'opacity-0'}`}></div>

                      <span 
                        className={`transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] relative z-10 shrink-0 flex justify-center items-center
                        ${isActive ? `${item.iconColor} scale-105 drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]` : `${item.iconColor} opacity-90 group-hover:opacity-100`}
                        ${isCollapsed ? 'text-[1.6rem]' : 'text-[1.35rem]'}
                        `}
                      >
                        {item.icon}
                      </span>

                       {/* metin animasyonu */}
                      <div className={`
                          overflow-hidden whitespace-nowrap transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)]
                          ${isCollapsed ? 'w-0 opacity-0' : 'w-32 opacity-100 ml-2'}
                      `}>
                        <span className={`text-sm font-medium tracking-wide relative z-10 
                          ${isActive ? 'font-bold' : 'group-hover:text-white'}`}>
                          {item.label}
                        </span>
                      </div>
                      
                      {!isActive && (
                          <div className="absolute inset-0 rounded-[1.2rem] opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/5 pointer-events-none mix-blend-overlay"></div>
                      )}
                    </>
                  )}
                </NavLink>
              ))}
            </div>
          </div>
        ))}
      </nav>

      {/* logout*/}
      <div className="mt-auto pt-6 border-t border-white/5 relative z-10">
        <button
          onClick={handleLogout}
          className={`w-full flex items-center ${isCollapsed ? 'justify-center' : 'gap-4'} px-4 py-4 text-gray-400 hover:text-red-400 hover:bg-red-500/10 rounded-[1.2rem] transition-all duration-300 group cursor-pointer`}
        >
          <div className="w-10 h-10 rounded-xl bg-white/6 flex items-center justify-center group-hover:bg-red-500/20 transition-colors shadow-sm shrink-0">
            <FiLogOut size={20} className="text-gray-300 group-hover:text-red-400 transition-colors" />
          </div>
          
          <div className={`
              overflow-hidden whitespace-nowrap transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)]
              ${isCollapsed ? 'w-0 opacity-0' : 'w-24 opacity-100 ml-0'}
          `}>
             <div className="flex flex-col items-start pl-4">
               <span className="text-sm font-bold text-gray-200 group-hover:text-red-400 transition-colors">{t('logout')}</span>
             </div>
          </div>
        </button>
      </div>
     
    </aside>
  );
};

export default Sidebar;