import * as yup from 'yup';

export const registerValidationSchema = yup.object().shape({
  email: yup.string()
    .email('Geçerli bir email adresi girin')
    .required('Email alanı zorunludur.'),
  
  age: yup.number()
    .min(18, 'Yaşınız 18 veya daha büyük olmalıdır')
    .max(100, 'Yaşınız 100 veya daha küçük olmalıdır')
    .required('Yaş alanı zorunludur.'),

  phone: yup.string()
    .matches(/^[0-9]{10}$/, 'Geçerli bir telefon numarası girin (10 haneli)')
    .required('Telefon alanı zorunludur.'),
  
  password: yup.string()
    .min(6, 'Şifre en az 6 karakter olmalıdır')
    .matches(/[A-Z]/, 'Şifre en az bir büyük harf içermelidir')
    .matches(/[a-z]/, 'Şifre en az bir küçük harf içermelidir')
    .matches(/[0-9]/, 'Şifre en az bir rakam içermelidir')
    .required('Şifre alanı zorunludur.'),
  
  confirmPassword: yup.string()
    .oneOf([yup.ref('password'), null], 'Şifreler eşleşmiyor')
    .required('Şifre onayı zorunludur.'),
});

export const loginValidationSchema = yup.object().shape({
  email: yup.string()
    .email('Geçerli bir email adresi girin')
    .required('Email alanı zorunludur.'),
  
  password: yup.string()
    .min(1, 'Şifre alanı zorunludur')
    .required('Şifre alanı zorunludur.'),
});