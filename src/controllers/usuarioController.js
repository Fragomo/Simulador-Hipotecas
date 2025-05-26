import Usuario from "../models/Usuario.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Registro de usuario
export const registrarUsuario = async (req, res) => {
  const { nombre, email, password } = req.body;

  if (!nombre || !email || !password) {
    return res.status(400).json({ error: "Todos los campos son obligatorios" });
  }

  try {
    // Verificar si el usuario ya existe
    const usuarioExistente = await Usuario.findOne({ where: { email } });
    if (usuarioExistente) {
      return res.status(400).json({ error: "El email ya está registrado" });
    }

    // Hashear contraseña
    const salt = await bcrypt.genSalt(10);
    const passwordHasheado = await bcrypt.hash(password, salt);

    // Crear usuario
    await Usuario.create({
      nombre,
      email,
      password: passwordHasheado,
    });

    res.status(201).json({ mensaje: "Usuario registrado con éxito" });
  } catch {
    res.status(500).json({ error: "Error en el servidor" });
  }
};

// Login de usuario
export const loginUsuario = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Todos los campos son obligatorios" });
  }

  try {
    // Buscar usuario por email
    const usuario = await Usuario.findOne({ where: { email } });
    if (!usuario) {
      return res.status(400).json({ error: "Usuario no encontrado" });
    }

    // Comparar contraseñas
    const passwordCorrecto = await bcrypt.compare(password, usuario.password);
    if (!passwordCorrecto) {
      return res.status(400).json({ error: "Contraseña incorrecta" });
    }

    // Generar token JWT
    const jwtSecret = "your_default_jwt_secret"; // Reemplaza esto con una variable de entorno segura en producción
    const token = jwt.sign({ id: usuario.id }, jwtSecret, {
      expiresIn: "1h",
    });

    res.json({
      token,
      usuario: { id: usuario.id, nombre: usuario.nombre, email: usuario.email },
    });
  } catch  {
    res.status(500).json({ error: "Error en el servidor" });
  }
};

// Middleware para verificar JWT
export const verificarToken = (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) {
    return res
      .status(401)
      .json({ error: "Acceso denegado, token no proporcionado" });
  }

  try {
    const jwtSecret = "your_default_jwt_secret"; // Reemplaza esto con una variable de entorno segura en producción
    const decoded = jwt.verify(token, jwtSecret);
    req.usuarioId = decoded.id;
    next();
  } catch {
    res.status(400).json({ error: "Token inválido" });
  }
};
