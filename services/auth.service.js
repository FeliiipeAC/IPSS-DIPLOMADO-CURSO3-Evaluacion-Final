import jwt from "jsonwebtoken";
import { JWT_SECRET, JWT_EXPIRA } from "../config/jwt.js";
import { Profesor } from "../models/profesor.model.js";
import { Alumno } from "../models/alumno.model.js";

// ---------------------------------------------------------------------------
// SERVICE — autenticación. Habla con la base de datos y con bcrypt/jwt.
// El controller no toca la base directamente: llama a estas funciones.
// ---------------------------------------------------------------------------

// Firma un token con el id y el rol. Úsalo al registrar y al hacer login.
export const firmarToken = (id, rol) =>
  jwt.sign({ id, rol }, JWT_SECRET, { expiresIn: JWT_EXPIRA });

// TODO: registra un profesor.
//   - hashea la password con bcrypt (bcrypt.hash(password, 10))
//   - créalo en la base
//   - devuelve { token, profesor } (sin la password)
export const registrarProfesor = async (datos) => {
  const profesor = await Profesor.create(datos);
  const token = firmarToken(profesor._id, "profesor");
  return { token, profesor };
};

// REGISTRO alumno: igual, pero con rol "alumno".
export const registrarAlumno = async (datos) => {
  const alumno = await Alumno.create(datos);
  const token = firmarToken(alumno._id, "alumno");
  return { token, alumno };
};

// LOGIN: el email puede ser de un profesor O de un alumno. Busco en los dos.
export const login = async (email, password) => {
  // 1. ¿Es profesor?
  let usuario = await Profesor.findOne({ email });
  let rol = "profesor";

  // 2. Si no, ¿es alumno?
  if (!usuario) {
    usuario = await Alumno.findOne({ email });
    rol = "alumno";
  }

  // 3. Si no está en ninguno → null (el controller responderá 401).
  if (!usuario) return null;

  // 4. Comparo la password. Si no calza → null.
  const coincide = await usuario.compararPassword(password);
  if (!coincide) return null;

  // 5. Todo bien: firmo un token con el id y el ROL correcto.
  const token = firmarToken(usuario._id, rol);
  return { token, rol };
};
