import * as service from "../services/auth.service.js";

// POST /api/auth/registro/profesor
export const registrarProfesor = async (req, res) => {
  try {
    const resultado = await service.registrarProfesor(req.body);
    res.status(201).json(resultado);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// POST /api/auth/registro/alumno
export const registrarAlumno = async (req, res) => {
  try {
    const resultado = await service.registrarAlumno(req.body);
    res.status(201).json(resultado);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// POST /api/auth/login
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const resultado = await service.login(email, password);

    if (!resultado) {
      return res.status(401).json({ error: "Credenciales inválidas" });
    }

    res.json(resultado);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
