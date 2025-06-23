import { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";

// Creamos el contexto
const AuthContext = createContext();
const API_URL = import.meta.env.VITE_API_URL; 

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); 
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [loading, setLoading] = useState(true); 


  // Verificar si hay token 
  useEffect(() => {
    const fetchUser = async () => {
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(`${API_URL}/user`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUser(response.data);
      } catch (error) {
        console.error("Error al obtener el usuario", error);
        setToken(null);
        localStorage.removeItem("token");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
    //console.log("Token actual:", token);
  }, [token]);

  // Login 
    const login = async (credentials) => {
        try {
        const response = await axios.post(`${API_URL}/login`, {
        email: credentials.email,
        password: credentials.password,
        }, {
        headers: {
            'Content-Type': 'application/json',
        }
        });

        const { token, user } = response.data.data;

        localStorage.setItem("token", token);
        setToken(token);
        setUser(user);
        console.log("usuario: ", user);
        console.log("token: ", token);

        return { success: true };
    } catch (error) {
        const status = error.response.status;
        const message = error.response.data?.message || "Error en validación";
        const errors = error.response.data?.errors || {};

        return {
            success: false,
            error: {
            status,
            message,
            errors,
            },
        };
    }
    };

  // Logout
  const logout = async () => {
    if (!token) {
        setLoading(false);
        return;
    }

    try {
        await axios.post(`${API_URL}/logout`, {}, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

      setUser(null);
      setToken(null);
      localStorage.removeItem("token");

      return true;
    } catch (error) {
      console.error("Logout fallido", error?.message);
      return false;
    }

  };

  const register = async (userData) => {
    try {
        const response = await axios.post(`${API_URL}/register`, userData);

        const { token, user } = response.data.data;

        localStorage.setItem("token", token);
        setToken(token);
        setUser(user);

        return { success: true };
    } catch (error) {
        const status = error.response.status;
        const message = error.response.data?.message || "Error en el registro";
        const errors = error.response.data?.errors || {};
            return {
                success: false,
                error: {
                status,
                message,
                errors,
                },
            };
        }
    };


  const isAuthenticated = !!user;
  const isAdmin = user?.admin == true ; 

  return (
    <AuthContext.Provider
      value={{ user, token, login, logout, register, isAuthenticated, isAdmin, loading }}
    >
      {children}
    </AuthContext.Provider>
  );

  
};

// Hook personalizado
export const useAuth = () => useContext(AuthContext);
