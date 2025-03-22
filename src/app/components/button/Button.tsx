interface propsType {
  type?: "submit" | "reset" | "button" | undefined;
  onClick?: () => void;
  color?: string | undefined;
  className?: string;
  children: React.ReactNode;
}

const Button = ({ type, onClick, children, color, className }: propsType) => {
  return (
    <>
      <button 
      onClick={onClick} 
      type={type} 
      style={{ 
        backgroundColor: color,
        cursor:'pointer',
        borderRadius:'8px'
      }} 
      className={`${className}`}>
        {children}
      </button>
    </>
  );
};

export default Button;
