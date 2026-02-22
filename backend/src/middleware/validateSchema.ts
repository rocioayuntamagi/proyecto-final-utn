import { NextFunction, Request, Response } from "express"
import { ZodTypeAny } from "zod"

export const validateSchema = (schema: ZodTypeAny) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse({
        body: req.body,
        query: req.query,
        params: req.params
      })
      next()
    } catch (error) {
      return res.status(400).json({
        success: false,
        error: error.errors.map((e: any) => e.message)
      })
    }
  }