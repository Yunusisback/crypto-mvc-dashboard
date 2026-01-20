import { SiVisa } from "react-icons/si";
import { RiWifiFill } from "react-icons/ri";
import { useTranslation } from 'react-i18next'; 

const CreditCard = () => {
  const { t } = useTranslation(); 

  return (
    // dış container
    <div className="group w-full max-w-95 lg:w-95 shrink-0 aspect-[1.586] mx-auto perspective-[1000px] select-none ">
      
      {/* Kart */}
      <div
        className={`
          relative w-full h-full rounded-2xl overflow-hidden 
          transition-all duration-500 
          transform-style-preserve-3d group-hover:rotate-y-12 group-hover:rotate-x-[-8deg]
          bg-linear-to-br from-[#2b2215]/90 via-[#1a1a1a]/85 to-[#0d0d0d]/95
          backdrop-blur-2xl border border-primary/30 shadow-2xl shadow-black/60
        `}
      >
        {/* parlama efekti*/}
        <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-linear-to-tr from-transparent via-primary/20 to-transparent z-0 pointer-events-none"></div>

        {/* arka plan */}
        <div className="absolute top-[-30%] right-[-20%] w-[70%] h-full bg-[#C5A358]/20 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-[-30%] left-[-20%] w-[70%] h-full bg-[#8B6914]/20 rounded-full blur-3xl pointer-events-none"></div>

        {/* Çip deseni  */}
        <div 
          className="absolute inset-0 opacity-10 pointer-events-none mix-blend-overlay z-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M10 10 H 40 V 40 H 70' fill='none' stroke='%23FFD700' stroke-width='2' stroke-linecap='round'/%3E%3Cpath d='M90 10 V 50 H 50 V 90' fill='none' stroke='%23FFD700' stroke-width='2' stroke-linecap='round'/%3E%3Cpath d='M30 80 H 10 V 60' fill='none' stroke='%23FFD700' stroke-width='2' stroke-linecap='round'/%3E%3Ccircle cx='10' cy='10' r='3' fill='%23FFD700'/%3E%3Ccircle cx='70' cy='40' r='3' fill='%23FFD700'/%3E%3Ccircle cx='90' cy='10' r='3' fill='%23FFD700'/%3E%3Ccircle cx='50' cy='90' r='3' fill='%23FFD700'/%3E%3C/svg%3E")`,
            backgroundSize: '120px 120px', 
            backgroundRepeat: 'repeat',
          }}
        ></div>

        {/* içerik*/}
        <div className="relative w-full h-full p-6 z-10">
          <div className="relative">
            
            {/* logo */}
            <div className="absolute top-0 left-0">
            
              <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-linear-to-b from-primary to-[#ffe09d] drop-shadow-lg italic tracking-wide">
                Vault
              </h2>
            </div>

            {/* temassız */}
            <div className="absolute top-14 right-0 mt-2">
             
              <RiWifiFill className="rotate-90 text-primary/90" size={34} />
            </div>
          </div>

          {/* Çip ve Kart Numarası */}
          <div className="relative">

            {/* ÇİP */}
            <div className="absolute top-16 left-0">
              <div className="w-12 h-9 ml-2 bg-linear-to-br from-[#C5A358] via-[#8B6914] to-[#5a440d] rounded-lg border border-primary/30 relative overflow-hidden shadow-inner">
              
                {/* Çip çizgileri */}
                <div className="absolute top-1/2 left-0 right-0 h-px bg-black/30"></div>
                <div className="absolute top-0 bottom-0 left-1/3 w-px bg-black/30"></div>
                <div className="absolute top-0 bottom-0 right-1/3 w-px bg-black/30"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-5 border border-black/30 rounded-md"></div>
              </div>
            </div>

            {/* KART NUMARASI */}
            <div className="absolute top-28 left-0 w-full">

              <div className="font-mono text-xl tracking-widest text-[#FFF8E1] drop-shadow-md font-semibold whitespace-nowrap">
                4000 1234 5678 9010
              </div>
            </div>
          </div>

          <div className="relative">

            {/* isim */}
            <div className="absolute top-37 left-0">
              <div className="flex flex-col gap-1">

                {/* Etiketler */}
                <p className="text-[10px] text-[#C5A358] uppercase tracking-wide">{t('card_holder') || 'Card Holder'}</p>

                {/* Değerler  */}
                <p className="text-sm font-semibold text-[#FFF8E1] uppercase tracking-wider whitespace-nowrap">
                  Deniz Kaya
                </p>
              </div>
            </div>

            {/* tarih */}
            <div className="absolute top-37 left-36">
              <div className="flex flex-col gap-1">
                <div className="flex flex-col leading-[0.9rem]">
                  <p className="text-[10px] text-[#bd9c54] uppercase tracking-wide">{t('valid') || 'Valid'}</p>
                  <p className="text-[10px] text-[#C5A358] uppercase tracking-wide">{t('thru') || 'Thru'}</p>
                </div>
                <p className="text-sm font-semibold text-[#FFF8E1] font-mono">
                  12/25
                </p>
              </div>
            </div>

            {/* VISA */}
            <div className="absolute top-30 right-0">
              
              <SiVisa className="text-white w-24 h-auto opacity-95 drop-shadow-lg translate-y-2" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreditCard;