const Label = ({ children, className }) => {
  return (
    <span className={`text-sm font-medium ${className}`}>
      {children}
    </span>
  );
};

export default Label;
