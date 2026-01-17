import { SiVisa } from "react-icons/si";
import { RiWifiFill } from "react-icons/ri";
import { useTranslation } from 'react-i18next'; 

const CreditCard = () => {
  const { t } = useTranslation(); 

  return (
  
    <div className="group w-full max-w-95 lg:w-95 shrink-0 aspect-[1.586] mx-auto perspective-[1000px]">
      <div
        className={`
          relative w-full h-full rounded-2xl overflow-hidden 
          transition-all duration-500 shadow-2xl shadow-yellow-900/50
          transform-style-preserve-3d group-hover:rotate-y-12 group-hover:rotate-x-[-8deg]
          bg-linear-to-br from-[#DBB468] via-[#C5A358] to-[#8B6914]
        `}
      >
         {/* Arka Plan Efektleri */}
        <div className="absolute inset-0 bg-linear-to-br from-primary/30 via-[#FFA500]/20 to-[#DAA520]/40"></div>
        <div className="absolute top-[-30%] right-[-20%] w-[70%] h-full bg-primary/20 rounded-full blur-3xl"></div>

        {/* çip deseni */}
        <div 
          className="absolute inset-0 opacity-20 pointer-events-none mix-blend-overlay"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M10 10 H 40 V 40 H 70' fill='none' stroke='white' stroke-width='2' stroke-linecap='round'/%3E%3Cpath d='M90 10 V 50 H 50 V 90' fill='none' stroke='white' stroke-width='2' stroke-linecap='round'/%3E%3Cpath d='M30 80 H 10 V 60' fill='none' stroke='white' stroke-width='2' stroke-linecap='round'/%3E%3Ccircle cx='10' cy='10' r='3' fill='white'/%3E%3Ccircle cx='70' cy='40' r='3' fill='white'/%3E%3Ccircle cx='90' cy='10' r='3' fill='white'/%3E%3Ccircle cx='50' cy='90' r='3' fill='white'/%3E%3C/svg%3E")`,
            backgroundSize: '120px 120px', 
            backgroundRepeat: 'repeat',
            transform: 'rotate(0deg)'
          }}
        ></div>

        <div className="relative w-full h-full p-6">
          <div className="relative">
            
            {/* logo */}
            <div className="absolute top-0 left-0">
              <h2 className="text-4xl font-bold text-black drop-shadow-lg italic tracking-wide">
                Vault
              </h2>
            </div>

            {/* temassız */}
            <div className="absolute top-14 right-0 mt-2">
              <RiWifiFill className="rotate-90 text-black/90" size={34} />
            </div>
          </div>

          {/* Çip ve Kart Numarası */}
          <div className="relative">

            {/* ÇİP */}
            <div className="absolute top-16 left-0">
              <div className="w-12 h-9 ml-2 bg-linear-to-br from-[#f0f0f0] via-[#d9d9d9] to-[#a1a1a1] rounded-lg border border-[#7a7a7a]/40 relative overflow-hidden shadow-[1px_1px_3px_rgba(0,0,0,0.3)]">
                <div className="absolute top-1/2 left-0 right-0 h-px bg-black/10"></div>
                <div className="absolute top-0 bottom-0 left-1/3 w-px bg-black/10"></div>
                <div className="absolute top-0 bottom-0 right-1/3 w-px bg-black/10"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-5 border border-black/10 rounded-md"></div>
              </div>
            </div>

            {/* KART NUMARASI */}
            <div className="absolute top-28 left-0 w-full">
              <div className="font-mono text-xl tracking-widest text-white/95 drop-shadow-md font-semibold whitespace-nowrap">
                4000 1234 5678 9010
              </div>
            </div>
          </div>

          <div className="relative">

            {/* isim */}
            <div className="absolute top-37 left-0">
              <div className="flex flex-col gap-1">
                <p className="text-[10px] text-white/80 uppercase tracking-wide">{t('card_holder')}</p>
                <p className="text-sm font-semibold text-white/95 uppercase tracking-wider whitespace-nowrap">
                  Deniz Kaya
                </p>
              </div>
            </div>

            {/* tarih */}
            <div className="absolute top-37 left-36">
              <div className="flex flex-col gap-1">
                <div className="flex flex-col leading-[0.9rem]">
                  <p className="text-[10px] text-white/60 uppercase tracking-wide">{t('valid')}</p>
                  <p className="text-[10px] text-white/60 uppercase tracking-wide">{t('thru')}</p>
                </div>
                <p className="text-sm font-semibold text-white/95 font-mono">
                  12/25
                </p>
              </div>
            </div>

            {/* VISA */}
            <div className="absolute top-30 right-0">
              <SiVisa className="text-black/80 w-24 h-auto opacity-95 drop-shadow-lg translate-y-2" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreditCard;