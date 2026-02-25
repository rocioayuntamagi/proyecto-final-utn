
import { NextFunction, Request, Response } from "express"
import { ZodTypeAny } from "zod"

// Extender el tipo Request para incluir validatedQuery
declare module "express-serve-static-core" {
  interface Request {
    validatedQuery?: any
  }
}

export const validateSchema = (schema: ZodTypeAny) =>
  (req: Request, res: Response, next: NextFunction) => {

    try {
      schema.parse(req.body)   
      next()
    } catch (error: any) {

      return res.status(400).json({
        success: false,
        error: error.errors?.map((e: any) => e.message) || ["Datos inválidos"]
      })
    }
  }

  export const validateQuery = (schema: ZodTypeAny) : any =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = schema.parse(req.query)
      // Guardar el resultado validado en una nueva propiedad
      req.validatedQuery = result
      next()
    } catch (error: any) {
      return res.status(400).json({
        success: false,
        error: error.errors?.map((e: any) => e.message) || ["Query inválido"],
        zodError: error,
        errorString: JSON.stringify(error),
        errorMessage: error.message
      })
    }
  }