import { Router } from "express";
import * as controller from "../controllers/curso.controller.js";
import { proteger, soloRol } from "../middlewares/proteger.js";

// ---------------------------------------------------------------------------
// RUTAS — cursos. Todas exigen token (proteger) y rol (soloRol).
// ⚠️ Las rutas FIJAS (/mis-cursos, /mis-matriculas) van ANTES que las
//    dinámicas (/:id), o Express cree que "mis-cursos" es un :id.
// ---------------------------------------------------------------------------
export const cursoRoutes = Router();

// ── Rutas FIJAS primero ──
cursoRoutes.get(
  "/mis-cursos",
  proteger,
  soloRol("profesor"),
  controller.misCursos,
);
cursoRoutes.get(
  "/mis-matriculas",
  proteger,
  soloRol("alumno"),
  controller.misMatriculas,
);

// ── CRUD (profesor) ──
cursoRoutes.get("/", proteger, soloRol("profesor"), controller.listar);
cursoRoutes.post("/", proteger, soloRol("profesor"), controller.crear);
cursoRoutes.put("/:id", proteger, soloRol("profesor"), controller.editar);
cursoRoutes.delete("/:id", proteger, soloRol("profesor"), controller.borrar);

// ── Reglas del profesor ──
cursoRoutes.post(
  "/:id/asignarme",
  proteger,
  soloRol("profesor"),
  controller.asignarme,
);
cursoRoutes.get(
  "/:id/alumnos",
  proteger,
  soloRol("profesor"),
  controller.alumnosDelCurso,
);

// ── Reglas del alumno ──
cursoRoutes.post(
  "/:id/matricularme",
  proteger,
  soloRol("alumno"),
  controller.matricularme,
);
cursoRoutes.delete(
  "/:id/matricularme",
  proteger,
  soloRol("alumno"),
  controller.desmatricularme,
);