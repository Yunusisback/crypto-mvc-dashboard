import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

const Pagination = ({ currentPage, totalPages, handlePrev, handleNext }) => (
  <div className="flex items-center gap-4">
    <button 
      onClick={handlePrev} 
      disabled={currentPage === 1} 
      className="flex items-center gap-2 px-6 py-3 bg-white/5 hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed border border-white/10 rounded-xl text-white font-semibold transition-all hover:border-yellow-400/50 cursor-pointer"
    >
      <FiChevronLeft size={20} />
      Geri
    </button>
    
    <div className="px-6 py-3 bg-yellow-400/10 border border-yellow-400/20 rounded-xl">
      <span className="text-white font-bold">
        Sayfa <span className="text-yellow-400">{currentPage}</span> / {totalPages}
      </span>
    </div>
    
    <button 
      onClick={handleNext} 
      disabled={currentPage === totalPages} 
      className="flex items-center gap-2 px-6 py-3 bg-white/5 hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed border border-white/10 rounded-xl text-white font-semibold transition-all hover:border-yellow-400/50 cursor-pointer"
    >
      İleri
      <FiChevronRight size={20} />
    </button>
  </div>
);

export default Pagination;