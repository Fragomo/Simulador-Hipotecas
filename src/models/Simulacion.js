import { DataTypes } from "sequelize";
import db from "../config/database.js";

const Simulacion = db.define("Simulacion", {
  usuarioId: { type: DataTypes.INTEGER, allowNull: false },
  capital: { type: DataTypes.FLOAT, allowNull: false },
  tasa: { type: DataTypes.FLOAT, allowNull: false },
  plazo: { type: DataTypes.INTEGER, allowNull: false },
  metodo: { type: DataTypes.STRING, allowNull: false },
  tabla: { type: DataTypes.JSON, allowNull: false },
});

export default Simulacion;
