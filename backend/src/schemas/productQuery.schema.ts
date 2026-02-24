import { z } from "zod"

export const productQuerySchema = z.object({
  page: z.string().optional().transform(Number).refine(n => !isNaN(n) && n > 0, {
    message: "page debe ser un número mayor a 0"
  }),

  limit: z.string().optional().transform(Number).refine(n => !isNaN(n) && n > 0, {
    message: "limit debe ser un número mayor a 0"
  }),

  minPrice: z.string().optional().transform(Number).refine(n => !isNaN(n), {
    message: "minPrice debe ser un número"
  }),

  maxPrice: z.string().optional().transform(Number).refine(n => !isNaN(n), {
    message: "maxPrice debe ser un número"
  }),

  stockMin: z.string().optional().transform(Number).refine(n => !isNaN(n), {
    message: "stockMin debe ser un número"
  }),

  category: z.string().optional(),

  name: z.string().optional()
})