const Button = ({ children, className, ...props }) => {
  return (
    <button
      {...props}
      className={`w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
