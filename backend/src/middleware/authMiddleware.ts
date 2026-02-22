import jwt from "jsonwebtoken"
import { NextFunction, Request, Response } from "express"
import { IPayload } from "../interfaces/IPayload"

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const header = req.headers.authorization
  const JWT_SECRET = process.env.JWT_SECRET

  if (!JWT_SECRET) {
    throw new Error("Falta JWT_SECRET en variables de entorno")
  }

  if (!header) {
    return res.status(401).json({ success: false, error: "El token es requerido" })
  }

  if (!header.startsWith("Bearer ")) {
    return res.status(401).json({ success: false, error: "Formato de token inválido" })
  }

  const token = header.split(" ")[1]

  if (!token) {
    return res.status(401).json({ success: false, error: "Token inválido" })
  }

  try {
    const payload = jwt.verify(token, JWT_SECRET) as IPayload
    req.user = payload
    next()
  } catch (error) {
    return res.status(401).json({ success: false, error: "Token inválido o expirado" })
  }
}