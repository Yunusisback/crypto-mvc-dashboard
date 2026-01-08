import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { FiMail, FiLock, FiArrowRight, FiUser, FiPhone, FiGlobe, FiCheck } from "react-icons/fi";
import FormInput from "../../components/common/FormInput";

const LoginPageView = ({ formik, isLoginMode, setIsLoginMode }) => {
  
  const { t, i18n } = useTranslation();
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true); 

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
      className="w-full h-14.5 bg-linear-to-r from-yellow-500 to-yellow-600 hover:from-yellow-400 hover:to-yellow-500 text-black font-bold rounded-2xl transition-all duration-300 transform active:scale-[0.98] shadow-lg shadow-yellow-500/20 hover:shadow-yellow-500/40 flex items-center justify-center gap-3 group cursor-pointer"
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
    <div className="min-h-screen flex items-center justify-center p-4 bg-black relative overflow-hidden">
      
      {/* Dil Seçici */}
      <div className="absolute top-6 right-6 z-50">
        <button 
          onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
          className="flex items-center gap-2 bg-[#121212] border border-white/10 rounded-full px-4 py-2 text-gray-400 hover:text-yellow-400 hover:border-yellow-500/30 transition-all cursor-pointer shadow-lg"
        >
          <FiGlobe size={18} />
          <span className="uppercase font-bold text-sm">{i18n.language}</span>
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

   
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-96 h-96 bg-yellow-600/10 rounded-full blur-[100px] animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-yellow-500/10 rounded-full blur-[100px] animate-pulse delay-1000"></div>
      </div>

      {/* Form Alanı */}
      <div className="relative z-10 w-full max-w-5xl">
        <div className="p-8 md:p-12"> 
          
          <div className="text-center mb-10 space-y-2">
            <h1 className="text-5xl md:text-6xl font-black tracking-tighter drop-shadow-2xl">
              <span className="text-transparent bg-clip-text bg-linear-to-r from-yellow-400 to-yellow-600">Crypto</span>
              <span className="text-white">Vault</span>
            </h1>
            
       
            <h2 
              className={`
                text-2xl font-bold mt-4 h-8 
                transition-opacity duration-1000 ease-out 
                ${isVisible ? 'opacity-100' : 'opacity-0'}
              `}
            >
              {/* İçerik hep render ediliyor ama opacity ile gizleniyor */}
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

          <form onSubmit={formik.handleSubmit} className="space-y-8">
            {isLoginMode ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
                <FormInput formik={formik} name="email" type="email" label={t('email')} icon={FiMail} />
                <FormInput formik={formik} name="password" type="password" label={t('password')} icon={FiLock} />
                <SubmitButton text={t('login')} isSubmitting={formik.isSubmitting} />
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <FormInput formik={formik} name="email" type="email" label={t('email')} icon={FiMail} />
                  <FormInput formik={formik} name="age" type="number" label={t('age')} icon={FiUser} />
                  <FormInput formik={formik} name="phone" type="tel" label={t('phone')} icon={FiPhone} />
                  <FormInput formik={formik} name="password" type="password" label={t('password')} icon={FiLock} />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-start">
                  <div className="md:col-span-3">
                      <FormInput formik={formik} name="confirmPassword" type="password" label={t('confirm_password')} icon={FiLock} />
                  </div>
                  <SubmitButton text={t('register')} isSubmitting={formik.isSubmitting} />
                </div>
              </>
            )}
          </form>

           {/* Alt Linkler */}
          <div className="text-center mt-10">
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