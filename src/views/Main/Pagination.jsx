import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

const Pagination = ({ currentPage, totalPages, handlePrev, handleNext }) => (
  <div className="flex items-center gap-3 p-2 bg-black/40 backdrop-blur-md rounded-2xl border border-white/5 shadow-xl select-none">
    
    <button 
      onClick={handlePrev} 
      disabled={currentPage === 1} 
      className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all
        disabled:opacity-30 disabled:cursor-not-allowed
        bg-white/5 hover:bg-white/10 text-white border border-white/5 hover:border-white/20"
    >
      <FiChevronLeft size={18} />
      <span className="hidden sm:inline">Geri</span>
    </button>
    
    <div className="px-6 py-2 bg-yellow-400/10 border border-yellow-400/20 rounded-xl min-w-30 text-center">
      <span className="text-gray-400 text-xs font-bold uppercase tracking-wider block mb-0.5">Sayfa</span>
      <span className="text-white font-mono font-black text-lg">
        {currentPage} <span className="text-gray-600 text-sm">/ {totalPages}</span>
      </span>
    </div>
    
    <button 
      onClick={handleNext} 
      disabled={currentPage === totalPages} 
      className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all
        disabled:opacity-30 disabled:cursor-not-allowed
        bg-yellow-400 hover:bg-yellow-300 text-black shadow-lg shadow-yellow-400/20"
    >
      <span className="hidden sm:inline">İleri</span>
      <FiChevronRight size={18} />
    </button>
  </div>
);

export default Pagination;