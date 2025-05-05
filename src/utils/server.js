import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import db from "db";
import simulacionRoutes from "routes/simulacionRoutes";
import usuarioRoutes from "routes/usuarioRoutes";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/simulaciones", simulacionRoutes);
app.use("/api/usuarios", usuarioRoutes);

const PORT = process.env.PORT || 5000;
db.sync()
.then(() => console.log("Database connected"))
.catch((error) => console.log("Error en la Base de Datos", error));
    
    
app.listen(PORT, () => console.log("Server running on port 5000"));