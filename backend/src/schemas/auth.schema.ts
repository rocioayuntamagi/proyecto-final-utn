import { z } from "zod"

export const registerSchema = z.object({
  body: z.object({
    email: z.string().email("El email no es válido"),
    password: z.string().min(5, "La contraseña debe tener al menos 5 caracteres"),
    username: z.string().min(2, "El nombre de usuario es obligatorio")
  })
})

export const loginSchema = z.object({
  body: z.object({
    email: z.string().email("El email no es válido"),
    password: z.string().min(5, "La contraseña debe tener al menos 5 caracteres")
  })
})