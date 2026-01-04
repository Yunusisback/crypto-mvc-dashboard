
import InputFieldView from '../InputFieldView';
import { Link } from 'react-router-dom';

const registerInputs = [
  { label: "E-Mail", type: "email", name: "email" },
  { label: "Yaş", type: "number", name: "age" },
  { label: "Şifre", type: "password", name: "password" },
  { label: "Şifre Onay", type: "password", name: "confirmPassword" },
];

const RegisterPageView = ({ formik }) => {
  return (
    <div className="login-page pt-5">
      <div className="container my-2">
        <h2 className="d-flex gap-3 justify-content-center align-items-center glow-title">
          <img height={60} src="coin-logo.png" alt="Logo" />
          <span>
            <span className="anim-coin" style={{ color: '#ffd700' }}>Coin</span>
            <span className="anim-vault" style={{ color: '#fff' }}>Vault</span>
          </span>
        </h2>

        <form onSubmit={formik.handleSubmit}>
          {registerInputs.map((data) => (
            <InputFieldView key={data.name} formik={formik} data={data} />
          ))}

          <button type="submit" className="btn custom-signup-btn w-100 mb-3">
            Kaydol
          </button>
          
          <Link to="/" className="btn custom-login-btn w-100">
            Giriş Yap
          </Link>
        </form>
      </div>
    </div>
  );
};

export default RegisterPageView;
