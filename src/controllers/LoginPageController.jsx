import{ useState } from 'react';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import LoginPageView from '../views/LoginPage/LoginPageView.jsx';
import AuthModel from '../models/AuthModel';
import { loginValidationSchema, registerValidationSchema } from '../utils/authSchema';

const LoginPageController = ({ setIsLoggedIn, isLoginMode, setIsLoginMode }) => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [authError, setAuthError] = useState('');
  const [authSuccess, setAuthSuccess] = useState('');

  const initialValues = isLoginMode
    ? { email: '', password: '' }
    : { email: '', age: '', password: '', confirmPassword: '' };

  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    validationSchema: isLoginMode ? loginValidationSchema : registerValidationSchema,
    onSubmit: async (values, { resetForm, setFieldError }) => {
      setIsSubmitting(true);
      setAuthError('');
      setAuthSuccess('');

      await new Promise(resolve => setTimeout(resolve, 1000));

      try {
        if (isLoginMode) {
          const user = AuthModel.loginUser(values.email, values.password);
          
          if (!user) {
            if (!AuthModel.isEmailRegistered(values.email)) {
              setFieldError('email', 'Bu email adresi kayıtlı değil');
              setAuthError('Email adresi bulunamadı. Lütfen kayıt olun.');
            } else {
              setFieldError('password', 'Şifre yanlış');
              setAuthError('Şifre yanlış. Lütfen tekrar deneyin.');
            }
            setIsSubmitting(false);
            return;
          }

          setAuthSuccess('Giriş başarılı! Yönlendiriliyorsunuz...');
          localStorage.setItem("isLoggedIn", "true");
          localStorage.setItem("currentUser", JSON.stringify(user));
          
          setTimeout(() => {
            setIsLoggedIn(true);
            navigate("/home", { replace: true });
            resetForm();
          }, 1500);

        } else {
          if (AuthModel.isEmailRegistered(values.email)) {
            setFieldError('email', 'Bu email adresi zaten kayıtlı');
            setAuthError('Bu email adresi zaten kullanılıyor. Lütfen giriş yapın.');
            setIsSubmitting(false);
            return;
          }

          const newUser = AuthModel.registerUser(values);
          setAuthSuccess('Kayıt başarılı! Otomatik olarak giriş yapılıyor...');
          
          setTimeout(() => {
            localStorage.setItem("isLoggedIn", "true");
            localStorage.setItem("currentUser", JSON.stringify(newUser));
            setIsLoggedIn(true);
            navigate("/home", { replace: true });
            resetForm();
          }, 1500);
        }
      } catch (error) {
        console.error('İşlem hatası:', error);
        setAuthError('Beklenmeyen bir hata oluştu. Lütfen tekrar deneyin.');
      }
      setIsSubmitting(false);
    },
  });

  const handleModeChange = (newMode) => {
    setIsLoginMode(newMode);
    setAuthError('');
    setAuthSuccess('');
    formik.resetForm();
  };

  return (
    <LoginPageView
      formik={formik}
      isLoginMode={isLoginMode}
      setIsLoginMode={handleModeChange}
      isSubmitting={isSubmitting}
      authError={authError}
      authSuccess={authSuccess}
    />
  );
};

export default LoginPageController;