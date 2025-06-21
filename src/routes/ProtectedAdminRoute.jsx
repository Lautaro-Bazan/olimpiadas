import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedAdminRoute = () => {
  const { isAuthenticated, isAdmin, loading } = useAuth();

  if (loading) return <p>Cargando...</p>;

  return isAuthenticated && isAdmin ? <Outlet /> : <Navigate to="/" />;
};

export default ProtectedAdminRoute;



