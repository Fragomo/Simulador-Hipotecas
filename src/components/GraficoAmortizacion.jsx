import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import PropTypes from "prop-types";

export default function GraficoAmortizacion({ datos }) {
  const { capital, tasa, plazo, metodo } = datos;
  const tasaDecimal = parseFloat(tasa) / 100 / 12;
  let saldoPendiente = parseFloat(capital);
  let tablaAmortizacion = [];

  if (metodo === "frances") {
    const cuota = (capital * tasaDecimal) / (1 - Math.pow(1 + tasaDecimal, -plazo));
    for (let mes = 1; mes <= plazo; mes++) {
      let interes = saldoPendiente * tasaDecimal;
      let capitalPagado = cuota - interes;
      saldoPendiente -= capitalPagado;
      tablaAmortizacion.push({ mes, cuota, interes, capitalPagado, saldoPendiente });
    }
  } else if (metodo === "aleman") {
    let cuotaCapital = capital / plazo;
    for (let mes = 1; mes <= plazo; mes++) {
      let interes = saldoPendiente * tasaDecimal;
      let cuota = cuotaCapital + interes;
      saldoPendiente -= cuotaCapital;
      tablaAmortizacion.push({ mes, cuota, interes, capitalPagado: cuotaCapital, saldoPendiente });
    }
  }

  return (
    <div className="mt-5 p-4 bg-white shadow-md rounded-md">
      <h2 className="text-lg font-bold mb-3">Evolución del Pago ({metodo})</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={tablaAmortizacion}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="mes" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="cuota" stroke="#8884d8" name="Cuota Mensual" />
          <Line type="monotone" dataKey="interes" stroke="#82ca9d" name="Intereses Pagados" />
          <Line type="monotone" dataKey="capitalPagado" stroke="#ff7300" name="Capital Amortizado" />
          <Line type="monotone" dataKey="saldoPendiente" stroke="#ff0000" name="Saldo Pendiente" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

GraficoAmortizacion.propTypes = {
  datos: PropTypes.shape({
    capital: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    tasa: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    plazo: PropTypes.number.isRequired,
    metodo: PropTypes.oneOf(["frances", "aleman"]).isRequired,
  }).isRequired,
};
