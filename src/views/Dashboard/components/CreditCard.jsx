
import { SiVisa } from "react-icons/si";
import { RiWifiFill } from "react-icons/ri"; 

const CreditCard = () => {
  return (
    // Kart Konteyner
    <div className="group perspective-1000 w-full aspect-[1.586] cursor-pointer mx-auto shadow-2xl shadow-black/50 rounded-[14px]">
      <div className="relative w-full h-full rounded-[14px] overflow-hidden transition-all duration-500 transform group-hover:scale-[1.02] border border-white/10 bg-[#0a0a0a]">
        
   
        <div className="absolute inset-0 bg-linear-to-br from-[#1a1a1a] via-[#050505] to-[#000000]"></div>
        
      
        <div className="absolute top-[-50%] left-[-20%] w-[80%] h-[150%] bg-white/5 rounded-full blur-3xl pointer-events-none mix-blend-overlay"></div>
        <div className="absolute bottom-[-30%] right-[-20%] w-[60%] h-full bg-white/5 rounded-full blur-2xl pointer-events-none mix-blend-overlay"></div>
        
    

    
        <div className="relative z-10 p-[6%] flex flex-col h-full justify-between font-sans text-white">
          
          {/*  Üst Kısım Visa Gold ve Temassız */}
          <div className="flex justify-between items-start">
             <h2 className="text-[5cqw] leading-none font-normal tracking-wide text-white/90 drop-shadow-md" style={{ fontSize: 'clamp(14px, 5cqw, 24px)' }}>
                Visa Gold
             </h2>
             <RiWifiFill className="rotate-90 drop-shadow-md opacity-80" style={{ fontSize: 'clamp(20px, 8cqw, 36px)' }} />
          </div>

          {/* Orta Kısım Gümüş Çip ve Numaralar */}
          <div className="flex flex-col gap-[4%]">

             {/* Gümüş Çip */}
             <div className="w-[14%] aspect-[1.2] bg-linear-to-br from-[#e3e3e3] to-[#8f8f8f] rounded-[15%] border border-[#7a7a7a]/50 relative overflow-hidden shadow-lg">
                 <div className="absolute top-1/2 left-0 right-0 h-px bg-[#444]/40"></div>
                 <div className="absolute top-0 bottom-0 left-1/3 w-px bg-[#444]/40"></div>
                 <div className="absolute top-0 bottom-0 right-1/3 w-px bg-[#444]/40"></div>
                 <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[35%] h-[50%] border border-[#444]/40 rounded-[20%]"></div>
             </div>

             {/* Kart Numarası */}
             <div className="w-full">
                <p className="font-mono tracking-[0.08em] text-transparent bg-clip-text bg-linear-to-b from-white to-gray-400 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] whitespace-nowrap text-center w-full mt-3 pr-5" 
                   style={{ fontSize: 'clamp(16px, 6.5cqw, 25px)' }}>
                   4000 1234 5678 9010
                </p>
             </div>
          </div>

          {/*   Alt Kısım tarih isim logo */}
          <div className="flex justify-between items-end w-full">
             
             {/* Sol Tarihler ve İsim */}
             <div className="flex flex-col gap-2.5 w-[70%] -translate-y-6">
                
                {/* 12/25 */}
                <div className="flex items-center justify-center w-[60%] gap-1">
                   <div className="flex flex-col leading-none items-end ">
                      <span className="text-[0.4rem] md:text-[0.5rem] font-bold uppercase text-white/50 tracking-wide">Valid</span>
                      <span className="text-[0.4rem] md:text-[0.5rem] font-bold uppercase text-white/50 tracking-wide">Thru</span>
                   </div>
                   <p className="font-mono font-medium text-white/90 drop-shadow-md" style={{ fontSize: 'clamp(10px, 4cqw, 18px)' }}>
                      12/25
                   </p>
                </div>

                {/* İsim */}
                <p className="font-medium tracking-widest uppercase font-mono text-transparent bg-clip-text bg-linear-to-b from-white to-gray-400 drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)] whitespace-nowrap overflow-hidden text-ellipsis"
                   style={{ fontSize: 'clamp(10px, 4cqw, 18px)' }}>
                   ARYA WIJAYA
                </p>
             </div>

             {/* sağ Visa Logosu */}
             <div className="w-[30%] flex justify-end translate-y-2">
               <SiVisa className="text-white drop-shadow-lg opacity-90 w-full h-auto" />
             </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default CreditCard;