
import { z } from "zod"

const emptyToUndefined = (val: any) => (val === "" ? undefined : val);

export const productQuerySchema = z.object({
  page: z.union([z.string(), z.number()])
    .optional()
    .transform(emptyToUndefined)
    .transform(Number)
    .refine(n => !isNaN(n) && n > 0, {
      message: "page debe ser un número mayor a 0"
    }),

  limit: z.union([z.string(), z.number()])
    .optional()
    .transform(emptyToUndefined)
    .transform(Number)
    .refine(n => isNaN(n) ? true : (n > 0), {
      message: "limit debe ser un número mayor a 0"
    }),

  minPrice: z.union([z.string(), z.number()])
    .optional()
    .transform(emptyToUndefined)
    .transform(Number)
    .refine(n => isNaN(n) ? true : !isNaN(n), {
      message: "minPrice debe ser un número"
    }),

  maxPrice: z.union([z.string(), z.number()])
    .optional()
    .transform(emptyToUndefined)
    .transform(Number)
    .refine(n => isNaN(n) ? true : !isNaN(n), {
      message: "maxPrice debe ser un número"
    }),

  stockMin: z.union([z.string(), z.number()])
    .optional()
    .transform(emptyToUndefined)
    .transform(Number)
    .refine(n => isNaN(n) ? true : !isNaN(n), {
      message: "stockMin debe ser un número"
    }),

  category: z.string().optional(),
  name: z.string().optional()
})