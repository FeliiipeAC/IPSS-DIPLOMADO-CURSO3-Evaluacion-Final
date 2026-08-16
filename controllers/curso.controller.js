import * as service from "../services/curso.service.js";

// ---------------------------------------------------------------------------
// CONTROLLERS — cursos. Aquí viven las reglas de negocio.
// El id y el rol del usuario que hace la petición vienen en req.usuario
// (lo puso el middleware `proteger` desde el token).
// ---------------------------------------------------------------------------

const NO_ENCONTRADO = { error: "Curso no encontrado" };

// GET /api/cursos — todos, con populate.
export const listar = async (req, res) => {
  try {
    const cursos = await service.listarCursos();
    res.json(cursos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// POST /api/cursos — crea (nace EN_MATRICULA, sin profesor).
export const crear = async (req, res) => {
  try {
    const curso = await service.crearCurso(req.body);
    res.status(201).json(curso);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// PUT /api/cursos/:id — edita.
export const editar = async (req, res) => {
  try {
    const curso = await service.editarCurso(req.params.id, req.body);
    if (!curso) return res.status(404).json(NO_ENCONTRADO);
    res.json(curso);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// DELETE /api/cursos/:id — borra.
export const borrar = async (req, res) => {
  try {
    const curso = await service.borrarCurso(req.params.id);
    if (!curso) return res.status(404).json(NO_ENCONTRADO);
    res.json({ mensaje: "Curso eliminado" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// GET /api/cursos/mis-cursos — los cursos que dicta ESTE profesor.
export const misCursos = async (req, res) => {
  try {
    const cursos = await service.cursosDelProfesor(req.usuario.id);
    res.json(cursos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// POST /api/cursos/:id/asignarme — el profesor se asigna un curso LIBRE.
export const asignarme = async (req, res) => {
  try {
    const curso = await service.buscarCurso(req.params.id);
    if (!curso) return res.status(404).json(NO_ENCONTRADO);

    // REGLA: si ya tiene profesor, nadie se lo quita → 409.
    if (curso.profesor) {
      return res.status(409).json({ error: "Este curso ya tiene profesor" });
    }

    curso.profesor = req.usuario.id; // el id sale del TOKEN, no del body
    await curso.save();
    res.json(curso);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// GET /api/cursos/:id/alumnos — SOLO el profesor que dicta el curso.
export const alumnosDelCurso = async (req, res) => {
  try {
    const curso = await service.buscarCursoConAlumnos(req.params.id);
    if (!curso) return res.status(404).json(NO_ENCONTRADO);

    // REGLA DE PROPIEDAD: si el profesor del curso NO soy yo → 403.
    // curso.profesor es un ObjectId; lo comparo como texto con mi id.
    if (!curso.profesor || curso.profesor.toString() !== req.usuario.id) {
      return res.status(403).json({ error: "No dictas este curso" });
    }

    res.json(curso.alumnos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET /api/cursos/mis-matriculas — los cursos donde está matriculado ESTE alumno.
export const misMatriculas = async (req, res) => {
  try {
    const cursos = await service.cursosDelAlumno(req.usuario.id);
    res.json(cursos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// POST /api/cursos/:id/matricularme — el alumno se matricula a sí mismo.
export const matricularme = async (req, res) => {
  try {
    const curso = await service.buscarCurso(req.params.id);
    if (!curso) return res.status(404).json(NO_ENCONTRADO);

    // REGLA: solo si está EN_MATRICULA. Si está CERRADO → 409.
    if (curso.estado !== "EN_MATRICULA") {
      return res.status(409).json({ error: "El curso está cerrado" });
    }

    // REGLA: no matricularse dos veces. El array guarda ObjectId → comparo como texto.
    const yaEsta = curso.alumnos.some((a) => a.toString() === req.usuario.id);
    if (yaEsta) {
      return res
        .status(409)
        .json({ error: "Ya estás matriculado en este curso" });
    }

    curso.alumnos.push(req.usuario.id); // mi id sale del TOKEN, no del body
    await curso.save();
    res.status(201).json(curso);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// DELETE /api/cursos/:id/matricularme — el alumno se sale del curso.
export const desmatricularme = async (req, res) => {
  try {
    const curso = await service.buscarCurso(req.params.id);
    if (!curso) return res.status(404).json(NO_ENCONTRADO);

    if (curso.estado !== "EN_MATRICULA") {
      return res.status(409).json({ error: "El curso está cerrado" });
    }

    // Dejo el array sin mi id (filter quita al que coincide conmigo).
    curso.alumnos = curso.alumnos.filter(
      (a) => a.toString() !== req.usuario.id,
    );
    await curso.save();
    res.json(curso);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
