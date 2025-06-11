import { useState } from "react";
import PropTypes from "prop-types";

export default function Formulariosimulacion({ setResultado }) {
    const [capital, setCapital] = useState("");
    const [tasa, setTasa] = useState("");
    const [plazo, setPlazo] = useState("");
    const [metodo, setMetodo] = useState("frances");

    const calcularCuota = (e) => {
        e.preventDefault();
        const tasaDecimal = parseFloat(tasa) / 100 / 12;
        const cuota = (capital * tasaDecimal) / (1 - Math.pow(1 + tasaDecimal, -plazo));
        setResultado({ capital, tasa, plazo, metodo, cuota: cuota.toFixed(2) });
    };
   
    return (
       <form onSubmit={calcularCuota} className="bg-white p-4 shadow-md rounded-md w-1/2 ">
      <label className="block">Capital:</label>
      <input type="number" value={capital} onChange={(e) => setCapital(e.target.value)} className="border p-2 w-full" required />

      <label className="block mt-2">Tasa de Interés (%):</label>
      <input type="number" value={tasa} onChange={(e) => setTasa(e.target.value)} className="border p-2 w-full" required />

      <label className="block mt-2">Plazo (meses):</label>
      <input type="number" value={plazo} onChange={(e) => setPlazo(e.target.value)} className="border p-2 w-full" required />

      <label className="block mt-2">Método de Amortización:</label>
      <select value={metodo} onChange={(e) => setMetodo(e.target.value)} className="border p-2 w-full">
        <option value="frances">Francés (cuota fija)</option>
        <option value="aleman">Alemán (cuotas decrecientes)</option>
      </select>
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 mt-5 rounded-md">
        Calcular Cuota 
      </button>
    </form>
  );
  
}
 Formulariosimulacion.propTypes = {
      setResultado: PropTypes.func.isRequired,
    };
