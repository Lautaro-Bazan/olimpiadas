import { useNavigate } from "react-router-dom";
import { Input } from '../../common/inputs/maininput';
import { Button } from '../../common/buttons/mainButton';
import './authstyles.css';

export const ForgotPassword = () => {
  const navigate = useNavigate();
  const handleBack = () => {
      navigate("/login");
  }

  return (
    <main className="auth-wrapper">
      <div className="auth-container">
        <h1 className="auth-title">Restablecer Contraseña</h1>
        <p className='instructions'>Enviaremos un mail para restablecer la contraseña</p>
        <form className="auth-form">
          <Input placeholder="Email"  />

          <div className="button-group">
            <Button variant="outline" onClick={handleBack}>Iniciar Sesión</Button>
            <Button variant="filled">Enviar</Button>
          </div>
        </form>
      </div>
    </main>
  );
};
