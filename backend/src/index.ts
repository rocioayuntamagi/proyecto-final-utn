import express from "express"
import cors from "cors"
import { connectDb } from "./config/mongodb"
import { productRouter } from "./routes/productsRouter"
import { authRouter } from "./routes/authRouter"
import { authMiddleware } from "./middleware/authMiddleware"
import { IPayload } from "./interfaces/IPayload"
import dotenv from "dotenv"

dotenv.config()

const serverHttp = express()


declare global {
  namespace Express {
    interface Request {
      user?: IPayload
    }
  }
}

// middleware
serverHttp.use(cors())
serverHttp.use(express.json())

// http://localhost:50000/products

serverHttp.use("/products", authMiddleware, productRouter)
serverHttp.use("/auth", authRouter)

// error 404
serverHttp.use((req, res) => {
  res.status(404).json({ success: false, error: "el recurso no se encuentra" })
})

const PORT = process.env.PORT

// 0 - 65656
serverHttp.listen(PORT, () => {
  try {
    console.log(`✅ Servidor http en escucha en el puerto http://127.0.0.1:${PORT}`)
    connectDb()
  } catch (error) {
    const err = error as Error
    console.log(err.message)
    process.exit(1)
  }
})