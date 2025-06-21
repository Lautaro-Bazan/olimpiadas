import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Input } from "../../common/inputs/maininput";
import { Button } from "../../common/buttons/mainButton";
import { ErrorMessage } from "../../common/errorMessage/errorMessage";
import { useAuth } from "../../../context/AuthContext";
import "./authstyles.css";

export const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault(); 
    setErrorMsg(""); 

    const result = await login({ email, password });

    if (!result.success) {
      if (result.error.status === 422) {
        const errors = result.error.errors;
        const messages = Object.values(errors).flat();
        setErrorMsg(messages[0]); 
      } else if (result.error.status === 401) {
        setErrorMsg("Email o contraseña incorrectos.");
      } else {
        setErrorMsg("Ocurrió un error. Intentá de nuevo.");
      }
      return;
    }
    navigate("/"); // Redirigir
  };

  const handleRegisterRedirect = () => {
    navigate("/register");
  }

  return (
    <main className="auth-wrapper">
      <div className="auth-container">
        <h1 className="auth-title">Iniciar Sesión</h1>

        <form className="auth-form" onSubmit={handleLogin}>
          {errorMsg &&  <ErrorMessage message={errorMsg}/>}
          <Input
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            placeholder="Contraseña"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="forgot-password">
            <Link  className="forgot-password-link" to="/forgot-password">¿Olvidaste la Contraseña?</Link>
          </div>

          <div className="button-group">
            <Button variant="outline" onClick={handleRegisterRedirect}>Registrarse</Button>
            <Button variant="filled" type="submit">
              Iniciar Sesión
            </Button>
          </div>
        </form>
      </div>
    </main>
  );
};
