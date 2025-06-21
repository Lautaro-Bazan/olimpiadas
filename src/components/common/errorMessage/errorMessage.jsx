import "./errorMessage.css"
export const ErrorMessage = ({
    message = "Ha ocurrido un error",
    className = "",
    ...props
}) => {
    return (
        <div className={`error-message ${className}`} {...props}>
            <p>{message}</p>
        </div>
    );
}