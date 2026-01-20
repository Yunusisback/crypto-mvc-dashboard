import  { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { 
  FiSearch, FiMessageCircle, FiMail, FiFileText, 
  FiChevronDown, FiChevronUp, FiExternalLink 
} from 'react-icons/fi';

const HelpView = () => {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState('');
  const [openIndex, setOpenIndex] = useState(null);

  
  const faqs = [
    {
      question: "Hesabımı nasıl doğrularım ?",
      answer: "Ayarlar > Kimlik Doğrulama menüsüne giderek kimlik belgenizin ön ve arka yüzünü yükleyip, selfie taramasını tamamlayarak hesabınızı dakikalar içinde doğrulayabilirsiniz."
    },
    {
      question: "Para çekme işlemim ne zaman gerçekleşir?",
      answer: "Kripto para çekim işlemleri ağ yoğunluğuna bağlı olarak genellikle 5-30 dakika içinde tamamlanır. Fiat para çekimleri banka saatlerine göre 1-3 iş günü sürebilir."
    },
    {
      question: "İki Faktörlü Doğrulama (2FA) kuramıyorum.",
      answer: "Google Authenticator uygulamasını indirdiğinizden emin olun. QR kodu okutamıyorsanız, verilen kurulum anahtarını manuel olarak girerek eşleştirme yapabilirsiniz."
    },
    {
      question: "İşlem ücretleri (Komisyonlar) nelerdir?",
      answer: "Piyasa yapıcı (Maker) işlemler için %0.1, piyasa alıcı (Taker) işlemler için %0.2 komisyon uygulanır. Vault Token (VLT) ile ödemelerde %25 indirim kazanırsınız."
    },
    {
      question: "Şifremi unuttum, ne yapmalıyım?",
      answer: "Giriş ekranındaki 'Şifremi Unuttum' bağlantısına tıklayın. E-posta adresinize gönderilen sıfırlama bağlantısını takip ederek yeni şifrenizi oluşturabilirsiniz."
    }
  ];

  // Arama Filtrelemesi
  const filteredFaqs = faqs.filter(faq => 
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const containerVars = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVars = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <motion.div 
      variants={containerVars}
      initial="hidden"
      animate="show"
      className="min-h-screen p-6 md:p-10 font-inter max-w-7xl mx-auto"
    >
      
      {/* Header ve arama*/}
      <motion.div variants={itemVars} className="text-center mb-16 relative">
        
        {/* Arka plan ışığı */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-yellow-500/10 rounded-full blur-[120px] pointer-events-none"></div>
        
        <h1 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tight">
          Nasıl yardımcı <span className="text-transparent bg-clip-text bg-linear-to-r from-yellow-400 to-orange-500">olabiliriz?</span>
        </h1>
        <p className="text-gray-400 text-lg mb-8 max-w-2xl mx-auto">
          Sıkça sorulan soruları inceleyin veya destek ekibimizle iletişime geçin.
        </p>

        {/* Arama Çubuğu*/}
        <div className="max-w-2xl mx-auto group relative h-16 w-full">
            
         
            <div className="relative w-full h-full rounded-2xl overflow-hidden p-px">
                
                
                <div className="absolute -inset-full animate-[spin_4s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,transparent_0%,transparent_50%,#ef4444_100%)] opacity-40"></div>
                
           
                <div className="relative z-10 bg-[#0a0a0a] rounded-2xl flex items-center h-full px-4 border border-transparent transition-all duration-300 group-hover:border-red-500/20 group-hover:bg-red-500/5">
                    
                    <FiSearch className="text-gray-400 w-6 h-6 mr-4 group-focus-within:text-red-500 group-hover:text-red-400 transition-colors" />
                    
                    <input 
                        type="text" 
                        placeholder="Sorunuzu buraya yazın..." 
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-transparent border-none text-white text-lg placeholder-gray-600 focus:ring-0 focus:outline-none font-medium h-full"
                    />
                </div>
            </div>
        </div>

      </motion.div>

      {/*İletişim Kartları */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16 relative z-10">
        
        {/* Canlı Destek */}
        <motion.div 
          variants={itemVars}
          whileHover={{ y: -5 }}
          className="bg-[#121212]/80 backdrop-blur-xl p-8 rounded-3xl border border-white/5 hover:border-yellow-500/30 group transition-all shadow-lg cursor-pointer"
        >
          <div className="w-14 h-14 bg-yellow-500/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-yellow-500/20 transition-colors">
            <FiMessageCircle size={28} className="text-yellow-500" />
          </div>
          <h3 className="text-xl font-bold text-white mb-2">Canlı Destek</h3>
          <p className="text-gray-400 text-sm mb-4">7/24 anlık olarak destek ekibimizle görüşün.</p>
          <span className="text-yellow-500 text-sm font-bold flex items-center gap-2 group-hover:gap-3 transition-all">
            Sohbeti Başlat <FiExternalLink />
          </span>
        </motion.div>

        {/* E-posta */}
        <motion.div 
          variants={itemVars}
          whileHover={{ y: -5 }}
          className="bg-[#121212]/80 backdrop-blur-xl p-8 rounded-3xl border border-white/5 hover:border-blue-500/30 group transition-all shadow-lg cursor-pointer"
        >
          <div className="w-14 h-14 bg-blue-500/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-blue-500/20 transition-colors">
            <FiMail size={28} className="text-blue-500" />
          </div>
          <h3 className="text-xl font-bold text-white mb-2">E-posta Gönder</h3>
          <p className="text-gray-400 text-sm mb-4">Detaylı sorularınız için bize yazın.</p>
          <span className="text-blue-500 text-sm font-bold flex items-center gap-2 group-hover:gap-3 transition-all">
            support@vault.com <FiExternalLink />
          </span>
        </motion.div>

        {/* Ticket */}
        <motion.div 
          variants={itemVars}
          whileHover={{ y: -5 }}
          className="bg-[#121212]/80 backdrop-blur-xl p-8 rounded-3xl border border-white/5 hover:border-emerald-500/30 group transition-all shadow-lg cursor-pointer"
        >
          <div className="w-14 h-14 bg-emerald-500/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-emerald-500/20 transition-colors">
            <FiFileText size={28} className="text-emerald-500" />
          </div>
          <h3 className="text-xl font-bold text-white mb-2">Destek Talebi</h3>
          <p className="text-gray-400 text-sm mb-4">Teknik sorunlar için talep oluşturun.</p>
          <span className="text-emerald-500 text-sm font-bold flex items-center gap-2 group-hover:gap-3 transition-all">
            Talep Oluştur <FiExternalLink />
          </span>
        </motion.div>
      </div>

      {/*Sıkça Sorulan Sorular  */}
      <motion.div variants={itemVars} className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold text-white mb-8 pl-2 border-l-4 border-yellow-500">Sıkça Sorulan Sorular</h2>
        
        <div className="space-y-4">
          {filteredFaqs.length > 0 ? (
            filteredFaqs.map((faq, index) => (
              <div 
                key={index} 
                className={`bg-[#121212] border ${openIndex === index ? 'border-yellow-500/30' : 'border-white/5'} rounded-2xl overflow-hidden transition-all duration-300`}
              >
                <button 
                  onClick={() => toggleAccordion(index)}
                  className="w-full flex items-center justify-between p-5 text-left focus:outline-none hover:bg-white/5 transition-colors"
                >
                  <span className={`font-semibold ${openIndex === index ? 'text-white' : 'text-gray-300'}`}>
                    {faq.question}
                  </span>
                  {openIndex === index ? (
                    <FiChevronUp className="text-yellow-500" />
                  ) : (
                    <FiChevronDown className="text-gray-500" />
                  )}
                </button>
                
                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="p-5 pt-0 text-gray-400 text-sm leading-relaxed border-t border-white/5">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))
          ) : (
            <div className="text-center py-12 text-gray-500">
              <p>Aradığınız kriterlere uygun sonuç bulunamadı.</p>
            </div>
          )}
        </div>
      </motion.div>

    </motion.div>
  );
};

export default HelpView;