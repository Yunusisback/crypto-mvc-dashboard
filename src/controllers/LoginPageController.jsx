import { useState, useCallback } from 'react';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import LoginPageView from '../views/LoginPage/LoginPageView.jsx';
import AuthModel from '../models/AuthModel';
import { loginValidationSchema, registerValidationSchema } from '../utils/authSchema';

const LoginPageController = ({ setIsLoggedIn, isLoginMode, setIsLoginMode }) => {
  const navigate = useNavigate();
  const [authStatus, setAuthStatus] = useState({ error: '', success: '' });


const initialValues = isLoginMode
  ? { email: '', password: '' }
  : { email: '', age: '', phone: '', password: '', confirmPassword: '' };  

  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    validationSchema: isLoginMode ? loginValidationSchema : registerValidationSchema,
    onSubmit: async (values, { resetForm, setFieldError, setSubmitting }) => {
      setAuthStatus({ error: '', success: '' });

      // Simüle edilmiş gecikme
      await new Promise(resolve => setTimeout(resolve, 1000));

      try {
        if (isLoginMode) {
          // GİRİŞ İŞLEMİ
          const user = AuthModel.loginUser(values.email, values.password);
          
          if (!user) {
            if (!AuthModel.isEmailRegistered(values.email)) {
              setFieldError('email', 'Bu email adresi kayıtlı değil');
              setAuthStatus({ error: 'Email adresi bulunamadı. Lütfen kayıt olun.', success: '' });
            } else {
              setFieldError('password', 'Şifre yanlış');
              setAuthStatus({ error: 'Şifre yanlış. Lütfen tekrar deneyin.', success: '' });
            }
            return;
          }

          completeAuth(user, 'Giriş başarılı! Yönlendiriliyorsunuz...', resetForm);

        } else {
        
          if (AuthModel.isEmailRegistered(values.email)) {
            setFieldError('email', 'Bu email adresi zaten kayıtlı');
            setAuthStatus({ error: 'Bu email adresi zaten kullanılıyor. Lütfen giriş yapın.', success: '' });
            return;
          }

          const newUser = AuthModel.registerUser(values);
          completeAuth(newUser, 'Kayıt başarılı! Otomatik giriş yapılıyor...', resetForm);
        }
      } catch (error) {
        console.error('İşlem hatası:', error);
        setAuthStatus({ error: 'Beklenmeyen bir hata oluştu.', success: '' });
      } finally {
        setSubmitting(false); 
      }
    },
  });

  // Ortak başarılı işlem sonlandırıcı 
  const completeAuth = (user, message, resetForm) => {
    setAuthStatus({ error: '', success: message });
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("currentUser", JSON.stringify(user));
    
    setTimeout(() => {
      setIsLoggedIn(true);
      navigate("/home", { replace: true });
      resetForm();
    }, 1500);
  };

  // Mod değiştirme işlemi
  const handleModeChange = useCallback((newMode) => {
    setIsLoginMode(newMode);
    setAuthStatus({ error: '', success: '' });
    formik.resetForm();
  }, [setIsLoginMode, formik]);

  return (
    <LoginPageView
      formik={formik}
      isLoginMode={isLoginMode}
      setIsLoginMode={handleModeChange}
      isSubmitting={formik.isSubmitting} 
      authError={authStatus.error}
      authSuccess={authStatus.success}
    />
  );
};

export default LoginPageController;