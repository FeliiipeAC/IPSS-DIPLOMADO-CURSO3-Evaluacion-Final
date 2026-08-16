# 🎓 API · Plataforma de Cursos

   API REST de una plataforma de cursos: profesores que dictan, alumnos que se
   matriculan, con autenticación por rol (JWT + bcrypt) y relaciones en MongoDB.

   > Evaluación Integradora · Módulo 3 (Backend y APIs REST) · Diplomado IPSS

   ## 🎥 Video demostrativo

   👉 

   ## Requisitos

   - Node.js 18 o superior
   - Una base de datos MongoDB (Atlas o local)

   ## Cómo levantar el proyecto

   ```
   git clone https://github.com/FeliiipeAC/IPSS-DIPLOMADO-CURSO3-Evaluacion-Final.git
   cd IPSS-DIPLOMADO-CURSO3-Evaluacion-Final
   npm install
   ```

   ```
   MONGODB_URI=""mongodb://lfarayac_db_user:CbOZAmTfrL7nNGVT@ac-hvse6cz-shard-00-00.i4wgcz3.mongodb.net:27017,ac-hvse6cz-shard-00-01.i4wgcz3.mongodb.net:27017,ac-hvse6cz-shard-00-02.i4wgcz3.mongodb.net:27017/plataforma?ssl=true&replicaSet=atlas-byvwe0-shard-0&authSource=admin&retryWrites=true&w=majority""
   ```

   Levanta el servidor:

   ```
   npm run start
   ```

   Queda escuchando en **http://localhost:3000**.

   ## Autenticación

   Regístrate o haz login en `/api/auth/...` para obtener un **token**. Envíalo en
   las rutas protegidas como header `Authorization: Bearer <token>`.

   ## Rutas

   | Método | Ruta | Rol | Descripción |
   |---|---|---|---|
   | POST | `/api/auth/registro/profesor` | pública | Registrar profesor |
   | POST | `/api/auth/registro/alumno` | pública | Registrar alumno |
   | POST | `/api/auth/login` | pública | Login (devuelve token con rol) |
   | GET | `/api/cursos` | profesor | Todos los cursos (con populate) |
   | POST | `/api/cursos` | profesor | Crear curso |
   | PUT | `/api/cursos/:id` | profesor | Editar curso |
   | DELETE | `/api/cursos/:id` | profesor | Borrar curso |
   | GET | `/api/cursos/mis-cursos` | profesor | Los cursos que dicto |
   | POST | `/api/cursos/:id/asignarme` | profesor | Asignarme un curso libre |
   | GET | `/api/cursos/:id/alumnos` | profesor | Alumnos de mi curso |
   | POST | `/api/cursos/:id/matricularme` | alumno | Matricularme |
   | DELETE | `/api/cursos/:id/matricularme` | alumno | Salirme del curso |
   | GET | `/api/cursos/mis-matriculas` | alumno | Mis cursos matriculados |

   ## Tecnologías

   Node.js · Express · MongoDB + Mongoose · JWT · bcrypt
   ````