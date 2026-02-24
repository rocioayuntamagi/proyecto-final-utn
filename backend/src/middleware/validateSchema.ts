import { NextFunction, Request, Response } from "express"
import { ZodTypeAny } from "zod"

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