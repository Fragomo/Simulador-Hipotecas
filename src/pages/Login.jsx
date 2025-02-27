import { useState, useContext } from "react";
import AuthContext from "../context/AuthContext";

const Login = () => {
    const { iniciarSesion } = useContext(AuthContext);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e) => {
        e.prevent.default();
        iniciarSesion(email,password);
    }

    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h2 className="text-2xl font-bold mb-4">Iniciar Sesión</h2>
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-lg shadow-lg"
        >
          <input
            type="email"
            placeholder="Email"
            className="border  p-4 mb-4 w-full"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Contraseña"
            className="border p-4 mb-4 w-full"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="submit"
            className="bg-red-500 text-white px-8 py-4 rounded-lg"
          >
            Entrar
          </button>
        </form>
      </div>
    );
    
};
export default Login; 