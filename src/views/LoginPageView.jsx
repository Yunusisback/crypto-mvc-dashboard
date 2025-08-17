import React from 'react';
import { useTranslation } from 'react-i18next';
import InputFieldView from './InputFieldView';

const registerInputs = [
  { label: "email", type: "email", name: "email" },
  { label: "age", type: "number", name: "age" },
  { label: "password", type: "password", name: "password" },
  { label: "confirm-password", type: "password", name: "confirmPassword" },
];

const loginInputs = [
  { label: "email", type: "email", name: "email" },
  { label: "password", type: "password", name: "password" },
];

const LoginPageView = ({ formik, isLoginMode, setIsLoginMode }) => {
  const { t } = useTranslation();
  const inputsToRender = isLoginMode ? loginInputs : registerInputs;

  const handleModeSwitch = (mode) => {
    if (mode !== isLoginMode) {
      setIsLoginMode(mode);
      formik.resetForm();
    }
  };

  return (
    <div className="login-page">
      <div className="container my-2">
        {/* Logo Section */}
        <h2 className="d-flex gap-3 justify-content-center align-items-center glow-title mb-4">
          <img height={60} src="coin-logo.png" alt="Logo" />
          <span>
            <span className="anim-coin" style={{ color: '#ffd700' }}>Coin</span>
            <span className="anim-vault" style={{ color: '#fff' }}>Vault</span>
          </span>
        </h2>

        {/* Form Container */}
        <div className="login-form-container glass-effect">
          {/* Toggle Buttonları */}
          <div className="form-toggle-container mb-4">
            <div className="btn-group w-100" role="group">
              <button
                type="button"
                className={`btn ${isLoginMode ? 'btn-outline-warning active' : 'btn-outline-secondary'} toggle-btn`}
                onClick={() => handleModeSwitch(true)}
              >
                <i className="fas fa-sign-in-alt me-2"></i>
                {t('login-heading')}
              </button>
              <button
                type="button"
                className={`btn ${!isLoginMode ? 'btn-outline-warning active' : 'btn-outline-secondary'} toggle-btn`}
                onClick={() => handleModeSwitch(false)}
              >
                <i className="fas fa-user-plus me-2"></i>
                {t('register-heading')}
              </button>
            </div>
          </div>

          {/* Form */}
          <form 
            onSubmit={formik.handleSubmit} 
            key={isLoginMode ? "login-form" : "register-form"}
            className="login-form-animated"
          >

            {/* Input Fields */}
            <div className="form-inputs">
              {inputsToRender.map((data, index) => (
                <div 
                  key={data.name} 
                  className="input-wrapper"
                  style={{
                    animationDelay: `${index * 0.1}s`
                  }}
                >
                  <InputFieldView 
                    formik={formik} 
                    data={{ ...data, label: t(data.label) }} 
                  />
                </div>
              ))}
            </div>

            {/* Submit Buttonu */}
            <div className="submit-section mt-4">
              <button 
                type="submit" 
                className={`btn w-100 submit-btn ${
                  isLoginMode ? 'custom-login-btn' : 'custom-signup-btn'
                }`}
                disabled={formik.isSubmitting}
              >
                {formik.isSubmitting ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2"></span>
                    {isLoginMode ? 'Giriş yapılıyor...' : 'Kaydolunuyor...'}
                  </>
                ) : (
                  <>
                    <i className={`fas ${isLoginMode ? 'fa-sign-in-alt' : 'fa-user-check'} me-2`}></i>
                    {isLoginMode ? t('login-heading') : t('register-heading')}
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPageView;