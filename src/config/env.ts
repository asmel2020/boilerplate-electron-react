import { z } from "zod";

const modeSchema = z.enum(["development", "test", "production"]);
// 1. Definir esquema con Zod
const envSchema = z.object({
  MODE: modeSchema, // Vite usa import.meta.env.MODE
  VITE_BASE_URL: z.string(),
});

// 2. Parsear y validar las variables de entorno
const _env = envSchema.safeParse(import.meta.env);

if (!_env.success) {
  console.error(
    "❌ Invalid environment variables",
    _env.error.flatten().fieldErrors
  );
  throw new Error("Invalid environment variables");
}

// 3. Exportar tipadas
export const env = _env.data;

// **Extra**: Inferir tipo automáticamente
export type Env = typeof env;
