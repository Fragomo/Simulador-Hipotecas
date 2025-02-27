import { createContext, useEffect, useState} from "react";
import axios from "axios";
import PropTypes from "prop-types";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
AuthProvider.propTypes = {
    children: PropTypes.node.isRequired
}

    const [usuario, setUsuario] = useState(null);
    const [token,setToken] = useState(localStorage.getItem("token") || "");

    useEffect(() => {
        if(token) {
            obtenerUsuario();
        }
    }, [token]);

    const obtenerUsuario = async ()=> {
        try{
            const res = await axios.get("http://localhost:5000/api/simulaciones", {
                headers:{Authorization:`Bearer ${token}`}
            });
            setUsuario(res.data.usuario);
        } catch(error) {
            console.error("Error al obtener el usuario: ", error)
            cerrarSesion;
        }
    };

    const iniciarSesion = async ( email, password) => {
        try{
            const res = await axios.post("http://localhost:5000/aspi/login", {email, password});
            setUsuario(res.data.usuario)
        } catch (error) {
            console.error("Error al iniciar sesión: ", error)
        }
    };

    const cerrarSesion = () => {
        setToken("");
        setUsuario(null);
        localStorage.removeItem("token")
    };

    return (
        <AuthContext.Provider value={{ usuario, token, iniciarSesion, cerrarSesion}}>
            { children }
        </AuthContext.Provider>
        )
};

export default AuthContext;
