import './Input.css';

export const Input = ({ 
    type = "text", 
    placeholder = "Ingrese texto", 
    value, 
    onChange, 
    ...props 
}) => {

    return (
        <div className={`input-container`}>
            <input
                type={type}
                className="input"
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                {...props}
            />
        </div>
    );
};

export default Input;