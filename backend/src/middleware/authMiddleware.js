import jwt from "jsonwebtoken"
import dotenv from "dotenv"
dotenv.config()

const JWT_SECRET = process.env.JWT_SECRET

const authMiddleware = (req, res, next) => {
  const header = req.headers.authorization

  if (!header) {
    return res.status(401).json({ success: false, error: "el token es requerido" })
  }

  if (!header.startsWith("Bearer")) {
    return res.status(401).json({ success: false, error: "el token debe ser formato jwt" })
  }

  const array = header.split(" ")

  const token = array[1]


  if (!token) {
    return res.status(401).json({ success: false, error: "token invalido" })
  }

  try {
    const payload = jwt.verify(token, JWT_SECRET)

    //  {
    //   _id: '697003f927908528b53a9348',
    //   username: 'Nuevo usuario',      
    //   email: 'mariano@gmail.com',
    //   iat: 1770331484,
    //   exp: 1770335084
    // }

    req.user = payload

    console.log(payload, "payload del token")

    next()
  } catch (error) {
    res.status(500).json({ success: false, error: error.message })
  }
}

export { authMiddleware }