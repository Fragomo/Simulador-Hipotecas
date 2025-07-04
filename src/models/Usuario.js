import { DataTypes } from "sequelize";
import db from "../config/database.js";

const Usuario = db.define("Usuario", {
  nombre: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false, unique: true },
  password: { type: DataTypes.STRING, allowNull: false },
});

export default Usuario;
