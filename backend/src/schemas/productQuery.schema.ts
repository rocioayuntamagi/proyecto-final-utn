import { z } from "zod";

export const productQuerySchema = z.object({
  page: z
    .string()
    .optional()
    .refine(v => v === undefined || !isNaN(Number(v)) && Number(v) > 0, {
      message: "page debe ser un número mayor a 0"
    }),

  limit: z
    .string()
    .optional()
    .refine(v => v === undefined || !isNaN(Number(v)) && Number(v) > 0, {
      message: "limit debe ser un número mayor a 0"
    }),

  name: z.string().optional(),
  category: z.string().optional()
});