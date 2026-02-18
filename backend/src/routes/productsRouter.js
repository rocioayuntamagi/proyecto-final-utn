import { Router } from "express"
import { createProduct, deleteProduct, getProducts, updateProduct } from "../controllers/product.controller.js"

const productRouter = Router()

// GET - http://localhost:50000/products/

productRouter.get("/", getProducts)
productRouter.post("/", createProduct)
productRouter.patch("/:id", updateProduct)
productRouter.delete("/:id", deleteProduct)

export { productRouter }