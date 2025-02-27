import { Navigate, Outlet } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";

const RutaProtegida = () => {
  const { usuario } = useContext(AuthContext);
  return usuario ? <Outlet /> : <Navigate to="/login" />;
};

export default RutaProtegida;
