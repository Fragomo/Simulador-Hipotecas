/*Para el  registro de ususarios necesito el nombre, el email y la contraseña. Además,
para poder controlar los posibles errores y saber si se ha  realizado correctamente
el registro tengo que manejar los errores con un try/catch*/ 

import { useState } from "react";
import axios from "axios";

const Registro = ()=> {
    const [nombre,setNombre] = useState("");
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await axios.post("http://localhost:5000/api/usuarios", {nombre,email,password});
        } catch (error) {
            console.error("Error en el registro. ", error)
        }
    }

    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h2 className="text-2xl font-bold mb-4">Registro</h2>
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-lg shadow-lg"
        >
          <input
            type="text"
            placeholder="Nombre"
            className="border p-2 mb-2 w-full"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email"
            className="border p-2 mb-2 w-full"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Contraseña"
            className="border p-2 mb-2 w-full"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="submit"
            className="bg-green-500 text-white px-4 py-2 rounded-lg"
          >
            Registrarse
          </button>
        </form>
      </div>
    );
};

export default Registro;