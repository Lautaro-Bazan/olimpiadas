import { useAuth } from "../../../context/AuthContext";
import { Button } from "../../common/buttons/mainButton"

export const User = () => {
    const { user, logout } = useAuth();

    const handdleLogout = () => {
        logout();
    };
  return (
    <div >
      <h1>{user.firstname + ' ' + user.lastname}</h1>
      <p>Esta es la pagina del usuario para ver sus ordenes</p>
    <Button onClick={handdleLogout}>Cerrar Sesion</Button>
    </div>


  );
}