import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input } from '../../common/inputs/maininput';
import { Button } from '../../common/buttons/mainButton';
import { ErrorMessage } from '../../common/errorMessage/errorMessage';
import { useAuth } from '../../../context/AuthContext';
import './authstyles.css';

export const Register = () => {
  const navigate = useNavigate();
  const { register } = useAuth();

  // Estados controlados
  const [email, setEmail] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [password, setPassword] = useState("");
  const [repassword, setRepassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleLoginRedirect = () => {
    navigate("/login");
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setErrorMsg("");

    if (password !== repassword) {
      setErrorMsg("Las contraseñas no coinciden.");
      return;
    }

    const result = await register({
      email,
      firstname,
      lastname,
      password,
      repassword, // Laravel espera este nombre
    });

    if (!result.success) {
      const errorList = Object.values(result.error.errors).flat();
      setErrorMsg(errorList[0] || "Error en el registro.");
      return;
    }

    // Registro exitoso
    navigate("/usuario"); // o donde prefieras redirigir
  };

  return (
    <main className="auth-wrapper">
      <div className="auth-container">
        <h1 className="auth-title">Registrarse</h1>
        <form className="auth-form" onSubmit={handleRegister}>
          {errorMsg &&  <ErrorMessage message={errorMsg}/>}

          <Input
            placeholder="Nombre"
            value={firstname}
            onChange={(e) => setFirstname(e.target.value)}
          />
          <Input
            placeholder="Apellido"
            value={lastname}
            onChange={(e) => setLastname(e.target.value)}
          />  
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
          <Input
            placeholder="Repetir Contraseña"
            type="password"
            value={repassword}
            onChange={(e) => setRepassword(e.target.value)}
          />


          <div className="button-group">
            <Button variant="outline" onClick={handleLoginRedirect}>
              Iniciar Sesión
            </Button>
            <Button variant="filled" type="submit">
              Registrarse
            </Button>
          </div>
        </form>
      </div>
    </main>
  );
};
