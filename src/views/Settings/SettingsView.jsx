import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  FiUser, FiLock, FiBell, FiGlobe, FiShield, FiSave, FiCamera,  FiAlertTriangle 
} from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

const SettingsView = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('profile');
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => setIsSaving(false), 2000);
  };

  // Menü Sekmeleri
  const tabs = [
    { id: 'profile', label: 'Profil Bilgileri', icon: <FiUser /> },
    { id: 'security', label: 'Güvenlik & Şifre', icon: <FiLock /> },
    { id: 'notifications', label: 'Bildirimler', icon: <FiBell /> },
    { id: 'preferences', label: 'Tercihler', icon: <FiGlobe /> },
  ];

  return (
    <div className="min-h-screen pt-6 pb-12 px-4 md:px-8 max-w-7xl mx-auto animate-fade-in font-inter select-none">
      
      {/* Header */}
      <div className="flex items-end justify-between mb-10">
        <div>
          <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight mb-4">
            Hesap <span className="text-transparent bg-clip-text bg-linear-to-r from-yellow-400 to-yellow-600">Ayarları</span>
          </h1>
          <p className="text-gray-400 text-sm md:text-base">
            Profilinizi düzenleyin, güvenliğinizi artırın ve tercihlerinizi kişiselleştirin.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Sol Menü  */}
        <div className="lg:col-span-3">
          <div className="glass-panel p-2 rounded-2xl border border-white/5 sticky top-24">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`
                  w-full flex items-center gap-3 px-4 py-3.5 rounded-xl text-sm font-bold transition-all duration-300 mb-1 last:mb-0
                  ${activeTab === tab.id 
                    ? 'bg-yellow-400 text-black shadow-lg shadow-yellow-400/20 translate-x-1' 
                    : 'text-gray-400 hover:text-white hover:bg-white/5'}
                `}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Sağ İçerik Alanı */}
        <div className="lg:col-span-9">
          <div className="glass-panel p-6 md:p-10 rounded-4xl border border-white/5 min-h-125 relative overflow-hidden">
            
            {/* Arka plan dekoratif */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-yellow-500/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="relative z-10"
              >
                {/* Profil*/}
                {activeTab === 'profile' && (
                  <div className="space-y-8">
                    <div className="flex items-center gap-6">
                      <div className="relative group">
                          <div className="w-24 h-24 rounded-full bg-linear-to-br from-yellow-400 to-yellow-600 p-0.5 shadow-xl">
                            <img 
                              src="https://imgs.search.brave.com/T5FYY3ziZtmmhNwIDE5KKWsF4nIoEqXV3TTsRwvxmbc/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG4u/cGl4YWJheS5jb20v/cGhvdG8vMjAyMC8w/OS8yMi8xOC81NS9h/dmF0YXItNTU5NDA1/Ml82NDAucG5n" 
                              alt="Profile" 
                              className="w-full h-full rounded-full object-cover border-4 border-[#0a0a0a]" 
                            />
                          </div>
                          <button className="absolute bottom-0 right-0 p-2 bg-[#1a1a1a] border border-white/10 rounded-full text-white hover:text-yellow-400 transition-colors shadow-lg cursor-pointer">
                            <FiCamera size={14} />
                          </button>
                      </div>
                      <div>
                        <h2 className="text-xl font-bold text-white">DENİZ KAYA</h2>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Ad Soyad</label>
                        <input type="text" defaultValue="Ely John" className="w-full bg-[#0a0a0a] border border-white/5 rounded-xl px-4 py-3 text-white focus:border-yellow-500/50 focus:bg-white/5 transition-all outline-none" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Kullanıcı Adı</label>
                        <input type="text" defaultValue="@denizkaya" className="w-full bg-[#0a0a0a] border border-white/5 rounded-xl px-4 py-3 text-white focus:border-yellow-500/50 focus:bg-white/5 transition-all outline-none" />
                      </div>
                      <div className="space-y-2 md:col-span-2">
                        <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Email Adresi</label>
                        <input type="email" defaultValue="denizkaya@mail.com" className="w-full bg-[#0a0a0a] border border-white/5 rounded-xl px-4 py-3 text-white focus:border-yellow-500/50 focus:bg-white/5 transition-all outline-none" />
                      </div>
                      <div className="space-y-2 md:col-span-2">
                        <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Biyografi</label>
                        <textarea rows="3" defaultValue="Kripto yatırımcısı ve teknoloji meraklısı." className="w-full bg-[#0a0a0a] border border-white/5 rounded-xl px-4 py-3 text-white focus:border-yellow-500/50 focus:bg-white/5 transition-all outline-none resize-none"></textarea>
                      </div>
                    </div>
                  </div>
                )}

                {/*Güvenlik*/}
                {activeTab === 'security' && (
                  <div className="space-y-8">
                    <h2 className="text-xl font-bold text-white border-b border-white/5 pb-4">Güvenlik Ayarları</h2>
                    
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/5">
                        <div className="flex items-center gap-4">
                          <div className="p-3 bg-emerald-500/10 text-emerald-400 rounded-xl">
                            <FiShield size={24} />
                          </div>
                          <div>
                            <h3 className="font-bold text-white">İki Faktörlü Doğrulama (2FA)</h3>
                            <p className="text-xs text-gray-500">Hesabınızı ekstra güvenli hale getirin.</p>
                          </div>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" className="sr-only peer" defaultChecked />
                          <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-500"></div>
                        </label>
                      </div>

                      <div className="space-y-4 pt-4">
                        <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Şifre Değiştir</label>
                        <div className="grid gap-4">
                          <input type="password" placeholder="Mevcut Şifre" className="w-full bg-[#0a0a0a] border border-white/5 rounded-xl px-4 py-3 text-white focus:border-yellow-500/50 focus:bg-white/5 transition-all outline-none" />
                          <div className="grid grid-cols-2 gap-4">
                            <input type="password" placeholder="Yeni Şifre" className="w-full bg-[#0a0a0a] border border-white/5 rounded-xl px-4 py-3 text-white focus:border-yellow-500/50 focus:bg-white/5 transition-all outline-none" />
                            <input type="password" placeholder="Yeni Şifre (Tekrar)" className="w-full bg-[#0a0a0a] border border-white/5 rounded-xl px-4 py-3 text-white focus:border-yellow-500/50 focus:bg-white/5 transition-all outline-none" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Bildirimler*/}
                {activeTab === 'notifications' && (
                  <div className="space-y-8">
                      <h2 className="text-xl font-bold text-white border-b border-white/5 pb-4">Bildirim Tercihleri</h2>
                      <div className="space-y-2">
                        {[
                          { title: "Fiyat Alarmları", desc: "Takip listenizdeki coinler hareketlendiğinde bildirim alın." },
                          { title: "İşlem Güncellemeleri", desc: "Yatırma, çekme ve takas işlemleriniz hakkında bilgi alın.", checked: true },
                          { title: "Haber Bülteni", desc: "Haftalık piyasa analizleri ve güncellemeler.", checked: true },
                          { title: "Güvenlik Uyarıları", desc: "Yeni cihaz girişlerinde anında haberdar olun.", checked: true },
                        ].map((item, idx) => (
                          <div key={idx} className="flex items-center justify-between p-4 hover:bg-white/5 rounded-xl transition-colors cursor-pointer group">
                             <div>
                               <h4 className="font-bold text-white group-hover:text-yellow-400 transition-colors">{item.title}</h4>
                               <p className="text-xs text-gray-500">{item.desc}</p>
                             </div>
                             <label className="relative inline-flex items-center cursor-pointer">
                              <input type="checkbox" className="sr-only peer" defaultChecked={item.checked} />
                              <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-yellow-400"></div>
                            </label>
                          </div>
                        ))}
                      </div>
                  </div>
                )}

                {/* tercihler*/}
                {activeTab === 'preferences' && (
                  <div className="space-y-8">
                    <h2 className="text-xl font-bold text-white border-b border-white/5 pb-4">Sistem Tercihleri</h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Dil (Language)</label>
                        <select className="w-full bg-[#0a0a0a] border border-white/5 rounded-xl px-4 py-3 text-white focus:border-yellow-500/50 focus:bg-white/5 transition-all outline-none appearance-none cursor-pointer">
                          <option>Türkçe</option>
                          <option>English</option>
                          <option>Deutsch</option>
                        </select>
                      </div>

                      <div className="space-y-2">
                        <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Para Birimi</label>
                        <select className="w-full bg-[#0a0a0a] border border-white/5 rounded-xl px-4 py-3 text-white focus:border-yellow-500/50 focus:bg-white/5 transition-all outline-none appearance-none cursor-pointer">
                          <option>USD ($)</option>
                          <option>EUR (€)</option>
                          <option>TRY (₺)</option>
                        </select>
                      </div>
                    </div>

                    <div className="mt-8 pt-8 border-t border-white/5">
                      <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-2xl flex items-start gap-4">
                          <div className="p-2 bg-red-500/20 rounded-lg text-red-500 mt-1">
                            <FiAlertTriangle />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-bold text-red-400">Hesabı Sil</h4>
                            <p className="text-xs text-red-400/70 mb-3">Bu işlem geri alınamaz. Tüm verileriniz kalıcı olarak silinecektir.</p>
                            <button className="text-xs font-bold bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors cursor-pointer">
                              Hesabımı Sil
                            </button>
                          </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Kaydet butonu */}
                <div className="mt-8 pt-6 border-t border-white/5 flex justify-end">
                   <button 
                    onClick={handleSave}
                    disabled={isSaving}
                    className="flex items-center gap-2 bg-yellow-400 text-black px-8 py-3 rounded-xl font-bold hover:bg-yellow-300 transition-all shadow-lg shadow-yellow-400/20 active:scale-95 cursor-pointer disabled:opacity-70"
                   >
                     {isSaving ? (
                       <>
                         <div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin"></div>
                         Kaydediliyor...
                       </>
                     ) : (
                       <>
                         <FiSave /> Değişiklikleri Kaydet
                       </>
                     )}
                   </button>
                </div>

              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsView;