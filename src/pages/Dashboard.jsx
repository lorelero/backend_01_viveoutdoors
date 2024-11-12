import { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";

//  redirige al usuario a diferentes páginas según su rol.

// const Dashboard = () => {
//   const { user, rol } = useContext(AuthContext);

//   if (rol === "admin") {
//     return <AdminDashboard />; // Componente solo para administradores
//   } else if (rol === "cliente") {
//     return <UserDashboard />; // Componente solo para clientes
//   } else {
//     return <div>No tienes permisos para acceder a esta página</div>; //Mensaje en caso de User no identificado
//   }
// };

// export default Dashboard;

import AdminDashboard from "./AdminDashboard";
import UserDashboard from "./UserDashboard";

const Dashboard = () => {
  const { user } = useContext(AuthContext);

  if (!user) return <div>No tienes permisos para acceder a esta página</div>;

  return user.rol === "admin" ? <AdminDashboard /> : <UserDashboard />;
};

export default Dashboard;
