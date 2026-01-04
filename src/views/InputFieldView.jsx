const InputField = ({ formik, data }) => {


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
