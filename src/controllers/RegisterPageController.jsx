import { useFormik } from 'formik';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import RegisterPageView from '../views/RegisterPageView';
import axios from 'axios'; 


const registerValidationSchema = yup.object().shape({
  email: yup.string().email('Geçerli bir email adresi girin').required('Email alanı zorunludur.'),
  age: yup.number()
    .min(18, 'Yaşınız 18 veya daha büyük olmalıdır')
    .max(100, 'Yaşınız 100 veya daha küçük olmalıdır')
    .required('Yaş alanı zorunludur.'),
  password: yup.string().min(6, 'Şifre en az 6 karakter olmalıdır').required('Şifre alanı zorunludur.'),
  confirmPassword: yup.string()
    .oneOf([yup.ref('password'), null], 'Şifreler eşleşmiyor')
    .required('Şifre onayı zorunludur.'),
});

const RegisterPageController = ({ setIsLoggedIn }) => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: { email: '', age: '', password: '', confirmPassword: '' },
    validationSchema: registerValidationSchema,
    onSubmit: async (values, { resetForm }) => { 
      try {
        const response = await axios.post('https://your-api-url/register', values);
        
        console.log('Kayıt başarılı:', response.data);
        
        
        localStorage.setItem("isLoggedIn", "true");
        setIsLoggedIn(true);
        navigate("/home", { replace: true });
        resetForm(); 

      } catch (error) {
        
        console.error('API hatası:', error.response?.data || error.message);
        alert('Kayıt işlemi başarısız oldu. Lütfen tekrar deneyin.');
      }
    },
  });

  return <RegisterPageView formik={formik} />;
};

export default RegisterPageController;