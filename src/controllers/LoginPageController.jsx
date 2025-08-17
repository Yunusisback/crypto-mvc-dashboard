import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import LoginPageView from '../views/LoginPageView.jsx';

// Basit localStorage tabanlı kullanıcı yönetimi
const USERS_STORAGE_KEY = 'coinvault_users';

// Kullanıcıları localStorage'dan getir
const getUsers = () => {
  const users = localStorage.getItem(USERS_STORAGE_KEY);
  return users ? JSON.parse(users) : [];
};

// Kullanıcıları localStorage'a kaydet
const saveUsers = (users) => {
  localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
};

// Email'in zaten kayıtlı olup olmadığını kontrol et
const isEmailRegistered = (email) => {
  const users = getUsers();
  return users.some(user => user.email === email);
};

// Kullanıcıyı kaydet
const registerUser = (userData) => {
  const users = getUsers();
  const newUser = {
    id: Date.now().toString(),
    email: userData.email,
    age: userData.age,
    password: userData.password, 
    createdAt: new Date().toISOString()
  };
  users.push(newUser);
  saveUsers(users);
  return newUser;
};

// Kullanıcı giriş kontrolü
const loginUser = (email, password) => {
  const users = getUsers();
  return users.find(user => user.email === email && user.password === password);
};

const registerValidationSchema = yup.object().shape({
  email: yup
    .string()
    .email('Geçerli bir email adresi girin')
    .required('Email alanı zorunludur.'),
  age: yup
    .number()
    .min(18, 'Yaşınız 18 veya daha büyük olmalıdır')
    .max(100, 'Yaşınız 100 veya daha küçük olmalıdır')
    .required('Yaş alanı zorunludur.'),
  password: yup
    .string()
    .min(6, 'Şifre en az 6 karakter olmalıdır')
    .matches(/[A-Z]/, 'Şifre en az bir büyük harf içermelidir')
    .matches(/[a-z]/, 'Şifre en az bir küçük harf içermelidir')
    .matches(/[0-9]/, 'Şifre en az bir rakam içermelidir')
    .required('Şifre alanı zorunludur.'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Şifreler eşleşmiyor')
    .required('Şifre onayı zorunludur.'),
});

const loginValidationSchema = yup.object().shape({
  email: yup
    .string()
    .email('Geçerli bir email adresi girin')
    .required('Email alanı zorunludur.'),
  password: yup
    .string()
    .min(1, 'Şifre alanı zorunludur')
    .required('Şifre alanı zorunludur.'),
});

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

      // Gerçekçi bir API gecikmesi simülasyonu
      await new Promise(resolve => setTimeout(resolve, 1000));

      try {
        if (isLoginMode) {
          // GİRİŞ YAPMA İŞLEMİ
          const user = loginUser(values.email, values.password);
          
          if (!user) {
            // Email kayıtlı mı kontrol et
            if (!isEmailRegistered(values.email)) {
              setFieldError('email', 'Bu email adresi kayıtlı değil');
              setAuthError('Email adresi bulunamadı. Lütfen kayıt olun.');
            } else {
              setFieldError('password', 'Şifre yanlış');
              setAuthError('Şifre yanlış. Lütfen tekrar deneyin.');
            }
            setIsSubmitting(false);
            return;
          }

          // Giriş başarılı
          setAuthSuccess('Giriş başarılı! Yönlendiriliyorsunuz...');
          localStorage.setItem("isLoggedIn", "true");
          localStorage.setItem("currentUser", JSON.stringify(user));
          
          setTimeout(() => {
            setIsLoggedIn(true);
            navigate("/home", { replace: true });
            resetForm();
          }, 1500);

        } else {
          // KAYIT OLMA İŞLEMİ
          
          // Email zaten kayıtlı mı kontrol et
          if (isEmailRegistered(values.email)) {
            setFieldError('email', 'Bu email adresi zaten kayıtlı');
            setAuthError('Bu email adresi zaten kullanılıyor. Lütfen giriş yapın.');
            setIsSubmitting(false);
            return;
          }

          // Yaş kontrolü
          if (values.age < 18) {
            setFieldError('age', '18 yaşından küçükler kayıt olamaz');
            setAuthError('18 yaşından küçük kullanıcılar kayıt olamaz.');
            setIsSubmitting(false);
            return;
          }

          // Kullanıcıyı kaydet
          const newUser = registerUser(values);
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

  // Mode değiştiğinde hataları temizle
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