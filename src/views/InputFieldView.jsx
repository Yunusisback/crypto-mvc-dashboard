const InputField = ({ formik, data }) => {
  // data prop'u her bir input'un label, name ve type bilgilerini içerir
  // data nesnesinden label, name ve type değerlerini alıyoruz
  // böylece her input için label, name, type bilgilerini
  // ayrı ayrı yazmak yerine data olarak geçiririz

  const { label, name, type } = data;
  return (
    <div>
      <label>{label}</label>
      <input
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        name={name}
        className={`form-control mt-2 animated-input ${
          formik.touched[name] && formik.errors[name] ? 'error' : ''
        }`}
        type={type}
      />
      {formik.touched[name] && formik.errors[name] && (
        <span>{formik.errors[name]}</span>
      )}
    </div>
  );
};

export default InputField;
