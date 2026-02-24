import { Router } from "express"
import { createProduct, deleteProduct, getProducts, updateProduct, getProductById} from "../controllers/product.controller"
import { authMiddleware } from "../middleware/authMiddleware"
import { validateSchema } from "../middleware/validateSchema"
import { productValidate, productPartialValidate } from "../schemas/product.schema"
import { productQuerySchema } from "../schemas/productQuery.schema"
import { validateQuery } from "../middleware/validateSchema"

const productRouter = Router()

// Todas las rutas de productos requieren autenticación
productRouter.use(authMiddleware)


productRouter.get("/", validateQuery(productQuerySchema), getProducts)


productRouter.get("/:id", getProductById)


productRouter.post("/", validateSchema(productValidate), createProduct)


productRouter.patch("/:id", validateSchema(productPartialValidate), updateProduct)


productRouter.delete("/:id", deleteProduct)



export { productRouter }