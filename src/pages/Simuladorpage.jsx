import Formulariosimulacion from "../components/Formulariosimulacion";
import GraficoAmortizacion from "../components/GraficoAmortizacion";
import TablaAmortizacion from "../components/TablaAmortizacion";
import { useState } from "react";

export default function Simuladorpage() {

    const [resultado, setResultado] = useState(null);
    const [tabla, setTabla] = useState([]);

    return (
        
            <div className="container mx-auto p-4">
                <h1 className="text-2xl font-bold mb-4">Simulador de Préstamos e Hipotecas</h1>
                <Formulariosimulacion setResultado={setResultado} />
                {resultado &&<GraficoAmortizacion datos={resultado} setTabla={setTabla}/>}
                {resultado && <TablaAmortizacion datos={{...resultado, tabla:tabla}} />}


            </div>
        );
}