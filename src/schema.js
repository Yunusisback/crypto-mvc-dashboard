import * as yup from 'yup';

// Şifre için gerekenller:
// - En az 1 büyük harf
// - En az 1 küçük harf
// - En az 1 rakam
// - En az 1 özel karakter
// - Minimum 5 karakter uzunluk
const regex =
  '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{5,}$';

// Validasyon şeması:
// Formdaki her input alanı için geçerlilik kurallarını tanımlar

// Her alanın veri tipi önce belirlenir (örneğin: string, number)
// Ardından zincirleme şekilde kurallar eklenir
  export const schema = yup.object().shape({

  // E-mail alanı için kurallar
  // - Geçerli formatta e-posta
  // - Boş bırakılamaz
  email: yup
    .string()
    .email('Lütfen geçerli bir E-mail formatı giriniz')
    .required('E-mail alanı zorunludur'),

  // Yaş alanı için kurallar
  // - En az 18
  // - En fazla 100
  // - Tam sayı olmalı
  // - Boş bırakılamaz
  age: yup
    .number()
    .min(18, "Yaşınız 18'den büyük olmalı")
    .max(100, "Yaşınız 100'den büyük olamaz")
    .integer('Lütfen tam sayı giriniz')
    .required('Yaş Alanı Zorunludur'),

  // Şifre alanı için kurallar
  // - En az 5 karakter
  // - Güçlü şifre (regex ile kontrol)
  // - Boş bırakılamaz
  password: yup
    .string()
    .min(5, 'Şifre en az 5 karakter olmalı')
    .matches(regex, 'Şifreniz güçlü değil')
    .required('Şifre Alanı Zorunludur'),

  // Şifre onayı için kurallar
  // - "password" alanıyla aynı olmalı
  // - Boş bırakılamaz
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Onay şifreniz doğru değil')
    .required('Şifre Onay Zorunludur'),
});
