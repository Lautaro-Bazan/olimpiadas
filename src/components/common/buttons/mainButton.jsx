import './Button.css';

export const Button = ({ 
    children,
    variant = "outline", // "outline" o "filled"
    onClick,
    disabled = false,
    className = "",
    type = "button",
    ...props 
}) => {
    return (
        <button
            type={type}
            className={`button ${variant} ${disabled ? 'disabled' : ''} ${className}`}
            onClick={onClick}
            disabled={disabled}
            {...props}
        >
            {children}
        </button>
    );
};

export default Button;