import './LoginPage.css';


const LoginPageView = ({ formik, isLoginMode, setIsLoginMode }) => {
  return (
    <div className="page-container">
      <div className="auth-card">
        
    
        <div className="visual-side">
          <div className="visual-content">
            <h2 className="brand-title">CoinVault</h2>
            <p className="brand-subtitle">Geleceğin Finansına Güvenle Girin.</p>
          </div>
          <div className="visual-overlay"></div>
        </div>

   
        <div className="form-side">
          
         
          <div className="auth-nav">
            <button
              type="button"
              className={`nav-btn ${isLoginMode ? 'active' : ''}`}
              onClick={() => setIsLoginMode(true)}
            >
              Giriş
            </button>
            <button
              type="button"
              className={`nav-btn ${!isLoginMode ? 'active' : ''}`}
              onClick={() => setIsLoginMode(false)}
            >
              Kayıt
            </button>
          </div>

          <div className="form-content">
            {isLoginMode ? (
           
              <form onSubmit={formik.handleSubmit} className="fade-in">
                <div className="input-group">
                  <input
                    placeholder="E-Mail Adresi"
                    name="email"
                    type="email"
                    className="modern-input"
                    {...formik.getFieldProps('email')}
                  />
                  {formik.touched.email && formik.errors.email && (
                    <small className="error-text">{formik.errors.email}</small>
                  )}
                </div>

                <div className="input-group">
                  <input
                    placeholder="Şifre"
                    name="password"
                    type="password"
                    className="modern-input"
                    {...formik.getFieldProps('password')}
                  />
                  {formik.touched.password && formik.errors.password && (
                    <small className="error-text">{formik.errors.password}</small>
                  )}
                </div>

                <button type="submit" className="action-btn" disabled={formik.isSubmitting}>
                  {formik.isSubmitting ? 'İŞLENİYOR...' : 'GİRİŞ YAP'}
                </button>
                <p className="forgot-pass">Şifremi Unuttum?</p>
              </form>
            ) : (
            
              <form onSubmit={formik.handleSubmit} className="fade-in">
                <div className="input-row">
                    <div className="input-group">
                        <input
                            placeholder="E-Mail"
                            name="email"
                            type="email"
                            className="modern-input"
                            {...formik.getFieldProps('email')}
                        />
                    </div>
                    <div className="input-group short">
                        <input
                            placeholder="Yaş"
                            name="age"
                            type="number"
                            className="modern-input"
                            {...formik.getFieldProps('age')}
                        />
                    </div>
                </div>
              
                {(formik.touched.email && formik.errors.email) || (formik.touched.age && formik.errors.age) ? (
                  <small className="error-text" style={{ marginBottom: '10px', display: 'block' }}>
                    {formik.errors.email || formik.errors.age}
                  </small>
                ) : null}

                <div className="input-group">
                  <input
                    placeholder="Şifre"
                    name="password"
                    type="password"
                    className="modern-input"
                    {...formik.getFieldProps('password')}
                  />
                  {formik.touched.password && formik.errors.password && (
                    <small className="error-text">{formik.errors.password}</small>
                  )}
                </div>

                <div className="input-group">
                  <input
                    placeholder="Şifre Tekrar"
                    name="confirmPassword"
                    type="password"
                    className="modern-input"
                    {...formik.getFieldProps('confirmPassword')}
                  />
                  {formik.touched.confirmPassword && formik.errors.confirmPassword && (
                    <small className="error-text">{formik.errors.confirmPassword}</small>
                  )}
                </div>

                <button type="submit" className="action-btn" disabled={formik.isSubmitting}>
                  {formik.isSubmitting ? 'İŞLENİYOR...' : 'HESAP OLUŞTUR'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPageView;