// Archivo para autenticación y autorización, controlando el login, logout, 
// y permisos de acceso según roles (cliente o administrador).

// src/context/AuthProvider.jsx
import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Estado para almacenar los datos del usuario autenticado
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Estado para verificar autenticación, si el usuario ha iniciado sesión.
  const navigate = useNavigate();
 const [rol, setRol] = useState(null); // Almacena el rol del usuario ("admin" o "client")

  useEffect(() => {
    // Al cargar, se puede verificar si el usuario está autenticado (por ejemplo, chequeando un token en localStorage)
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
      setIsAuthenticated(true);
     setRol(storedUser.rol);
    }
  }, []);

  const login = async (username, password) => {
    try {
      const response = await fetch("/users.json"); 
      const usersData = await response.json();

      const foundUser = usersData.find(
        (user) => user.username === username && user.password === password
      );

    // si es exitoso guarda el usuario en un local storage
      if (foundUser) {
        setUser(foundUser);
        setIsAuthenticated(true);
        setRol(foundUser.rol); // Guarda el rol del usuario (admin o client)
        localStorage.setItem("user", JSON.stringify(foundUser)); // Persistencia en localStorage
        return true;
      } else {
        alert("Credenciales Incorrectas, intente de nuevo"); //mensaje en caso de error
        return false;
      }
    } catch (error) {
      console.error("Error al cargar users.json:", error);
      return false;
    }
  };

  // const login = (email, password) => {
  //   const users = JSON.parse(localStorage.getItem("users")) || [];
  //   const userFound = users.find(
  //     (user) => user.email === email && user.password === password
  //   );

  //   if (userFound) {
  //     setUser(userFound);
  //     setIsAuthenticated(true);
  //     navigate("/dashboard");
  //     return true;
  //   } else {
  //     setIsAuthenticated(false);
  //     return false;
  //   }
  // };








  const logout = () => { //Limpia el estado del usuario y elimina cualquier persistencia.
    setUser(null);
    setIsAuthenticated(false);
    navigate("/login");
//    setRol(null);
//    localStorage.removeItem("user"); // Limpia la persistencia
  };

  const register = (newUser) => {
    // Simulación de registro (esto usualmente implicaría una llamada a una API)
    // registrar un nuevo usuario y simula agregarlo a un archivo JSON
    const usersData = import("../../public/users.json");
    usersData.push(newUser);
    
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        rol, // Exponemos el rol para usarlo en otros componentes
        login,
        logout,
        register,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

