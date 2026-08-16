import { Router } from "express";
import * as controller from "../controllers/curso.controller.js";
import { proteger, soloRol } from "../middlewares/proteger.js";

// ---------------------------------------------------------------------------
// RUTAS — cursos. Todas exigen token (proteger) y rol (soloRol).
// ⚠️ Las rutas FIJAS (/mis-cursos) van ANTES que las dinámicas (/:id),
//    o Express cree que "mis-cursos" es un :id.
// ---------------------------------------------------------------------------
export const cursoRoutes = Router();

// ── Ruta FIJA primero ──
cursoRoutes.get(
  "/mis-cursos",
  proteger,
  soloRol("profesor"),
  controller.misCursos,
);

// ── CRUD (profesor) ──
cursoRoutes.get("/", proteger, soloRol("profesor"), controller.listar);
cursoRoutes.post("/", proteger, soloRol("profesor"), controller.crear);
cursoRoutes.put("/:id", proteger, soloRol("profesor"), controller.editar);
cursoRoutes.delete("/:id", proteger, soloRol("profesor"), controller.borrar);

// ── Reglas del profesor (Paso 8) ──
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
