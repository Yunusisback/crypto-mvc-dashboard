import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { FiMail, FiLock, FiArrowRight, FiUser, FiPhone, FiGlobe, FiCheck } from "react-icons/fi";
import { Link } from 'react-router-dom';
import FormInput from "../../components/common/FormInput";

const LoginPageView = ({ formik, isLoginMode, setIsLoginMode }) => {

  const { t, i18n } = useTranslation();
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  // Header Linkleri
  const headerLinks = [
    { id: 1, en: 'Markets', tr: 'Piyasalar', path: '/markets' },
    { id: 2, en: 'Individuals', tr: 'Bireysel', path: '/individuals' },
    { id: 3, en: 'Businesses', tr: 'Kurumsal', path: '/business' },
    { id: 4, en: 'Discover', tr: 'Keşfet', path: '/discover' },
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    setIsLangMenuOpen(false);
  };

  const SubmitButton = ({ text, isSubmitting }) => (
    <button
      type="submit"
      disabled={isSubmitting}
      className="w-full h-12 md:h-14.5 bg-linear-to-r from-yellow-500 to-yellow-600 hover:from-yellow-400 hover:to-yellow-500 text-black font-bold rounded-2xl transition-all duration-300 transform active:scale-[0.98] shadow-lg shadow-yellow-500/20 hover:shadow-yellow-500/40 flex items-center justify-center gap-3 group cursor-pointer text-sm md:text-base"
    >
      {isSubmitting ? (
        <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
      ) : (
        <>
          <span>{text}</span>
          <div className="bg-black/10 p-1 rounded-full group-hover:bg-black/20 transition">
             <FiArrowRight className="group-hover:translate-x-0.5 transition" />
          </div>
        </>
      )}
    </button>
  );

  return (

    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">

      {/* Arka Plan Videosu */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source
            src="https://cdn.pixabay.com/video/2022/07/11/123817-729035790_large.mp4"
            type="video/mp4"
          />
          Tarayıcınız video etiketini desteklemiyor.
        </video>

        
        <div className="absolute inset-0 bg-black opacity-70"></div>
      </div>

      {/* Üst Navigasyon */}
      <header className="absolute top-6 left-6 md:top-8 md:left-8 z-50 hidden md:flex items-center gap-8">
        {headerLinks.map((link) => (
          <Link
            key={link.id}
            to={link.path}
            className="group relative text-sm md:text-base font-bold tracking-wide text-gray-300 hover:text-white transition-colors duration-300"
          >
            {i18n.language === 'tr' ? link.tr : link.en}
            
            <span className="absolute -bottom-1 left-0 w-0 h-0.75 bg-yellow-400 transition-all duration-300 group-hover:w-full box-shadow-[0_0_10px_rgba(250,204,21,0.8)]"></span>
          </Link>
        ))}
      </header>

      {/* Dil Seçici  */}
      <div className="absolute top-4 right-4 md:top-6 md:right-6 z-50">
        <button
          onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
          className="flex items-center gap-2 bg-black/30 backdrop-blur-sm border border-white/10 rounded-full px-3 py-1.5 md:px-4 md:py-2 text-gray-400 hover:text-yellow-400 hover:border-yellow-500/30 transition-all cursor-pointer shadow-lg"
        >
          <FiGlobe className="text-sm md:text-lg" />
          <span className="uppercase font-bold text-xs md:text-sm">{i18n.language}</span>
        </button>

        {isLangMenuOpen && (
          <div className="absolute top-full right-0 mt-2 w-32 bg-[#121212] border border-white/10 rounded-xl shadow-2xl overflow-hidden animate-fade-in-down">
             <button onClick={() => changeLanguage('tr')} className={`w-full text-left px-4 py-3 text-sm font-bold flex items-center justify-between hover:bg-white/5 transition-colors ${i18n.language === 'tr' ? 'text-yellow-400' : 'text-gray-400'}`}>
               Türkçe {i18n.language === 'tr' && <FiCheck />}
             </button>
             <div className="h-px bg-white/5 mx-2"></div>
             <button onClick={() => changeLanguage('en')} className={`w-full text-left px-4 py-3 text-sm font-bold flex items-center justify-between hover:bg-white/5 transition-colors ${i18n.language === 'en' ? 'text-yellow-400' : 'text-gray-400'}`}>
               English {i18n.language === 'en' && <FiCheck />}
             </button>
          </div>
        )}
      </div>

      <div className="absolute inset-0 pointer-events-none z-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-yellow-600/10 rounded-full blur-[100px] animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-yellow-500/10 rounded-full blur-[100px] animate-pulse delay-1000"></div>
      </div>

       {/* Ana Form Alanı */}
      <div className={`relative z-20 w-full mx-auto transition-all duration-500 ease-in-out ${isLoginMode ? 'max-w-[90%] md:max-w-sm' : 'max-w-[95%] md:max-w-2xl'}`}>

        
        <div className="p-6 md:p-8">

          {/* Logo ve Başlık */}
          <div className="text-center mb-6 space-y-2">

            <img
              src="/vault2.png"
              alt="CryptoVault Name"
             
              className="mx-auto h-24 md:h-48 w-auto object-contain drop-shadow-2xl hover:scale-105 transition-transform duration-300 mb-2"
            />

            <h2
              className={`
                text-xl md:text-2xl font-bold mt-2 h-8
                transition-opacity duration-1000 ease-out
                ${isVisible ? 'opacity-100' : 'opacity-0'}
              `}
            >
              {i18n.language === 'tr' ? (
                  <>
                    <span className="text-white">Hoş </span>
                    <span className="text-yellow-500">Geldiniz</span>
                  </>
              ) : (
                  <>
                    <span className="text-white">Wel</span>
                    <span className="text-yellow-500">come</span>
                  </>
              )}
            </h2>

          </div>

          <form onSubmit={formik.handleSubmit} className="space-y-4 md:space-y-6">
            {isLoginMode ? (

              // Login Modu 
              <div className="flex flex-col gap-4 md:gap-5">
                <FormInput formik={formik} name="email" type="email" label={t('email')} icon={FiMail} />
                <FormInput formik={formik} name="password" type="password" label={t('password')} icon={FiLock} />
                <div className="mt-2">
                  <SubmitButton text={t('login')} isSubmitting={formik.isSubmitting} />
                </div>
              </div>
            ) : (
              
              // Kayıt Modu
          
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5 animate-fade-in">
                  
                  {/* Email */}
                  <div className="md:col-span-2">
                    <FormInput formik={formik} name="email" type="email" label={t('email')} icon={FiMail} />
                  </div>

                  {/* Yan Yana Inputlar (mobilde alt alta) */}
                  <FormInput formik={formik} name="age" type="number" label={t('age')} icon={FiUser} />
                  <FormInput formik={formik} name="phone" type="tel" label={t('phone')} icon={FiPhone} />
                  
                  {/* Şifreler Yan Yana (Mobilde alt alta) */}
                  <FormInput formik={formik} name="password" type="password" label={t('password')} icon={FiLock} />
                  <FormInput formik={formik} name="confirmPassword" type="password" label={t('confirm_password')} icon={FiLock} />
                  
                  {/* Buton  */}
                  <div className="md:col-span-2 mt-2">
                    <SubmitButton text={t('register')} isSubmitting={formik.isSubmitting} />
                  </div>
              </div>
            )}
          </form>

          {/* Alt Linkler */}
          <div className="text-center mt-8 md:mt-10">
            <p className="text-gray-400 text-sm">
              {isLoginMode ? (i18n.language === 'tr' ? 'Hesabınız yok mu?' : 'No account?') : (i18n.language === 'tr' ? 'Zaten üye misiniz?' : 'Already a member?')}
              {" "}
              <button
                type="button"
                onClick={() => setIsLoginMode(!isLoginMode)}
                className="text-yellow-500 font-semibold hover:text-yellow-400 transition-colors ml-1 relative group cursor-pointer"
              >
                {isLoginMode ? t('register_heading') : t('login_heading')}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-yellow-400 transition-all group-hover:w-full"></span>
              </button>
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default LoginPageView;