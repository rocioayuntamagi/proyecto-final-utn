import { Router } from "express"
import { createProduct, deleteProduct, getProducts, updateProduct } from "../controllers/product.controller"
import { authMiddleware } from "../middleware/authMiddleware"
import { validateSchema } from "../middleware/validateSchema"
import { productValidate, productPartialValidate } from "../schemas/product.schema"

const productRouter = Router()

// Todas las rutas de productos requieren autenticación
productRouter.use(authMiddleware)


productRouter.get("/", getProducts)


productRouter.post("/", validateSchema(productValidate), createProduct)


productRouter.patch("/:id", validateSchema(productPartialValidate), updateProduct)


productRouter.delete("/:id", deleteProduct)

export { productRouter }