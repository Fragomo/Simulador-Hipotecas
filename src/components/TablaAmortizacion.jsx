import PropTypes from 'prop-types';

export default function TablaAmortizacion({ datos }) {

TablaAmortizacion.propTypes = {
  datos: PropTypes.shape({
    metodo: PropTypes.string.isRequired,
    tabla: PropTypes.arrayOf(PropTypes.shape({
      mes: PropTypes.number.isRequired,
      cuota: PropTypes.number.isRequired,
      interes: PropTypes.number.isRequired,
      capitalPagado: PropTypes.number.isRequired,
      saldoPendiente: PropTypes.number.isRequired,
    })).isRequired,
  }).isRequired,
};

  if (!datos) return null;

  return (
    <div className="mt-5 p-4 bg-white shadow-md rounded-md">
      <h2 className="text-lg font-bold mb-3">Tabla de Amortización ({datos.metodo})</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border px-4 py-2">Mes</th>
              <th className="border px-4 py-2">Cuota</th>
              <th className="border px-4 py-2">Intereses</th>
              <th className="border px-4 py-2">Capital</th>
              <th className="border px-4 py-2">Saldo</th>
            </tr>
          </thead>
          <tbody>
            {datos.tabla.map((fila, index) => (
              <tr key={index} className="text-center">
                <td className="border px-4 py-2">{fila.mes}</td>
                <td className="border px-4 py-2">{fila.cuota.toFixed(2)}</td>
                <td className="border px-4 py-2">{fila.interes.toFixed(2)}</td>
                <td className="border px-4 py-2">{fila.capitalPagado.toFixed(2)}</td>
                <td className="border px-4 py-2">{fila.saldoPendiente.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
