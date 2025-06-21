import { Link } from 'react-router-dom';
import { Input } from '../../common/inputs/maininput';
import { Button } from '../../common/buttons/mainButton';
import './authstyles.css';

export const NewPassword = () => {
  return (
    <main className="auth-wrapper">
      <div className="auth-container">
        <h1 className="auth-title">Restablecer Contraseña</h1>
        <form className="auth-form">
          <Input placeholder="Nueva Contraseña"  />
          <Input placeholder="Repetir Contraseña"  />

          <div className="button-group">
            <Button variant="outline">Iniciar Sesión</Button>
            <Button variant="filled">Restablecer</Button>
          </div>
        </form>
      </div>
    </main>
  );
};
