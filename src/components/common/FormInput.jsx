

const FormInput = ({ formik, name, type = "text", label, icon: Icon }) => {
  

  const inputContainerClass = "relative group";
  
  
  const inputClass = `
    peer w-full bg-white/5 hover:bg-white/10 
    border border-white/10 rounded-2xl py-4 pl-12 pr-4 
    text-white placeholder-transparent 
    focus:border-yellow-500/50 focus:bg-white/5 focus:ring-0 
    focus:shadow-[0_0_20px_rgba(234,179,8,0.15)] 
    transition-all duration-300 ease-out outline-none
    [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none
  `;

  const labelClass = `
    absolute left-12 top-4 text-gray-500 text-sm transition-all duration-300 
    peer-placeholder-shown:text-base peer-placeholder-shown:top-4 peer-placeholder-shown:text-gray-500
    peer-focus:-top-3 peer-focus:left-4 peer-focus:text-xs peer-focus:text-yellow-400 peer-focus:bg-black peer-focus:px-2
    peer-[:not(:placeholder-shown)]:-top-3 peer-[:not(:placeholder-shown)]:left-4 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:px-2 peer-[:not(:placeholder-shown)]:bg-black
    pointer-events-none tracking-wide
  `;
  
  const iconClass = `
    absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 
    peer-focus:text-yellow-500 peer-focus:scale-110
    peer-hover:text-gray-300 
    transition-all duration-300 ease-out
  `;

  return (
    <div className="space-y-1">
      <div className={inputContainerClass}>
        <input
          name={name}
          type={type}
          id={`field-${name}`}
          placeholder={label} 
          className={inputClass}
          {...formik.getFieldProps(name)}
        />
        <label htmlFor={`field-${name}`} className={labelClass}>{label}</label>
        {Icon && <Icon className={iconClass} size={20} />}
      </div>
      
      {/* Hata Mesajı */}
      {formik.touched[name] && formik.errors[name] && (
        <p className="text-red-400 text-xs pl-4 animate-pulse">{formik.errors[name]}</p>
      )}
    </div>
  );
};

export default FormInput;