import mongoose from "mongoose";
import bcrypt from "bcryptjs";

// ---------------------------------------------------------------------------
// MODELO — Profesor.
// ---------------------------------------------------------------------------
// TODO: define el schema del profesor. Campos (ver enunciado):
//   - nombre    (texto, obligatorio)
//   - email     (texto, único, obligatorio)
//   - password  (texto, obligatorio) → se guarda HASHEADO, nunca en texto plano
//
// Pista: usa { timestamps: true } para tener createdAt/updatedAt gratis.

const profesorSchema = new mongoose.Schema(
  {
    nombre: { type: String, required: true, trim: true },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: { type: String, required: true, minlength: 6 },
  },
  { timestamps: true },
);

// HOOK pre('save'): corre ANTES de guardar. Aquí hasheamos la password.
// Solo la re-hasheamos si cambió (para no doble-hashear en updates).
profesorSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  this.password = await bcrypt.hash(this.password, 10);
});

// Compara una password candidata con el hash guardado (sin des-hashear).
profesorSchema.methods.compararPassword = function (passwordPlano) {
  return bcrypt.compare(passwordPlano, this.password);
};

// Al convertir a JSON para responder, quitamos la password. Así NUNCA
// sale el hash en una respuesta de la API.
profesorSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

export const Profesor = mongoose.model(
  "Profesor",
  profesorSchema,
  "profesores",
);
