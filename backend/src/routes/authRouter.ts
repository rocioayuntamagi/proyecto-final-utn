import { Router } from "express"
import { login, register } from "../controllers/auth.controller"
import { validateSchema } from "../middleware/validateSchema"
import { registerSchema, loginSchema } from "../schemas/auth.schema"

const authRouter = Router()

authRouter.post("/register", validateSchema(registerSchema), register)

authRouter.post("/login", validateSchema(loginSchema), login)

export { authRouter }

