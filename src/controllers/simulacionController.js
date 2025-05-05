import Simulacion from "../models/Simulacion.js";

const calcularAmortizacion = (capital, tasa, plazo, metodo) => {
  const tasaDecimal = tasa / 100 / 12;
  let saldoPendiente = capital;
  let tabla = [];

  if (metodo === "frances") {
    const cuota =
      (capital * tasaDecimal) / (1 - Math.pow(1 + tasaDecimal, -plazo));
    for (let mes = 1; mes <= plazo; mes++) {
      let interes = saldoPendiente * tasaDecimal;
      let capitalPagado = cuota - interes;
      saldoPendiente -= capitalPagado;
      tabla.push({ mes, cuota, interes, capitalPagado, saldoPendiente });
    }
  } else if (metodo === "aleman") {
    let cuotaCapital = capital / plazo;
    for (let mes = 1; mes <= plazo; mes++) {
      let interes = saldoPendiente * tasaDecimal;
      let cuota = cuotaCapital + interes;
      saldoPendiente -= cuotaCapital;
      tabla.push({
        mes,
        cuota,
        interes,
        capitalPagado: cuotaCapital,
        saldoPendiente,
      });
    }
  } else if (metodo === "americano") {
    let interesFijo = capital * tasaDecimal;
    for (let mes = 1; mes < plazo; mes++) {
      tabla.push({
        mes,
        cuota: interesFijo,
        interes: interesFijo,
        capitalPagado: 0,
        saldoPendiente,
      });
    }
    tabla.push({
      mes: plazo,
      cuota: capital + interesFijo,
      interes: interesFijo,
      capitalPagado: capital,
      saldoPendiente: 0,
    });
  }

  return tabla;
};

// Guardar simulación en la base de datos
export const simularPrestamo = async (req, res) => {
  const { usuarioId, capital, tasa, plazo, metodo } = req.body;
  if (!usuarioId || !capital || !tasa || !plazo || !metodo) {
    return res.status(400).json({ error: "Todos los campos son obligatorios" });
  }

  const tabla = calcularAmortizacion(capital, tasa, plazo, metodo);

  try {
    const nuevaSimulacion = await Simulacion.create({
      usuarioId,
      capital,
      tasa,
      plazo,
      metodo,
      tabla,
    });
    res.json(nuevaSimulacion);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al guardar la simulación" });
  }
};

// Obtener simulaciones por usuario
export const obtenerSimulaciones = async (req, res) => {
  const { usuarioId } = req.params;
  try {
    const simulaciones = await Simulacion.findAll({ where: { usuarioId } });
    res.json(simulaciones);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener simulaciones" });
  }
};

