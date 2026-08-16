import { Curso } from "../models/curso.model.js";

// ---------------------------------------------------------------------------
// SERVICE — cursos. Habla con la base de datos.
// Las REGLAS DE NEGOCIO (validar estado, propiedad, etc.) pueden ir aquí o en
// el controller: tú decides, pero que estén en el servidor, no en el cliente.
// ---------------------------------------------------------------------------

// TODO: implementa las funciones que tus controllers necesiten. Por ejemplo:
//   - listarCursos()            → Curso.find().populate('profesor').populate('alumnos')
//   - crearCurso(datos)
//   - buscarCurso(id)
//   - editarCurso(id, datos)
//   - borrarCurso(id)
//   - cursosDelProfesor(profesorId)
//   - cursosDelAlumno(alumnoId)
//
// Piensa qué necesita cada ruta y crea solo lo que uses.

// .populate() cambia los ids por los documentos reales (nombre del profe, etc.)
export const listarCursos = () =>
  Curso.find().populate("profesor").populate("alumnos");

export const crearCurso = (datos) => Curso.create(datos);

export const buscarCurso = (id) => Curso.findById(id);

export const editarCurso = (id, datos) =>
  Curso.findByIdAndUpdate(id, datos, {
    returnDocument: "after",
    runValidators: true,
  });

export const borrarCurso = (id) => Curso.findByIdAndDelete(id);

// Los cursos que dicta un profesor (filtra por el campo profesor).
export const cursosDelProfesor = (profesorId) =>
  Curso.find({ profesor: profesorId }).populate("alumnos");

// Los cursos donde está matriculado un alumno (busca su id en el array).
export const cursosDelAlumno = (alumnoId) =>
  Curso.find({ alumnos: alumnoId }).populate("profesor");

// El curso con sus alumnos poblados (para la ruta de alumnos-del-curso).
export const buscarCursoConAlumnos = (id) =>
  Curso.findById(id).populate("alumnos");
