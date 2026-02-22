import { z } from "zod"

export const productValidate = z.object({
  name: z.string().min(4, "El nombre debe tener al menos 4 caracteres"),
  price: z.coerce.number().min(0, "El precio debe ser un número válido"),
  stock: z.coerce.number().min(0, "El stock debe ser un número válido"),
  description: z.string().min(3, "La descripción es obligatoria"),
  category: z.string().min(2, "La categoría es obligatoria")
})

export const productPartialValidate = productValidate.partial()