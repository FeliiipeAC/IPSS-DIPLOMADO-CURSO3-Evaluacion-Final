// ---------------------------------------------------------------------------
// CONFIG — el secreto para firmar y verificar los JWT.
// ---------------------------------------------------------------------------
// En un proyecto real esto va en una variable de entorno. Para la evaluación,
// puedes dejarlo aquí — pero cámbialo por una cadena tuya, larga y aleatoria.

export const JWT_SECRET =
"mi-secreto-super-largo-y-aleatorio-482913-cursos-ipss";

// Cuánto dura la sesión.
export const JWT_EXPIRA = "7d";
