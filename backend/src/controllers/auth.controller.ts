import { User } from "../models/user.model"
import bcryptjs from "bcryptjs"
import jwt from "jsonwebtoken"
import dotenv from "dotenv"
import { Request, Response } from "express"
import { IPayload } from "../interfaces/IPayload"

dotenv.config()

const JWT_SECRET = process.env.JWT_SECRET!

export const register = async (req: Request, res: Response) => {
  try {
    const { email, password, username } = req.body

    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return res.status(400).json({ success: false, error: "Email ya registrado" })
    }

    const hash = await bcryptjs.hash(password, 10)

    const newUser = await User.create({
      email,
      password: hash,
      username
    })

    return res.status(201).json({
      success: true,
      data: {
        _id: newUser._id,
        username: newUser.username,
        email: newUser.email
      }
    })
  } catch (error) {
    const err = error as Error
    return res.status(500).json({ success: false, error: err.message })
  }
}

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body

    const foundUser = await User.findOne({ email })
    if (!foundUser) {
      return res.status(401).json({ success: false, error: "Credenciales inválidas" })
    }

    const isValid = await bcryptjs.compare(password, foundUser.password)
    if (!isValid) {
      return res.status(401).json({ success: false, error: "Credenciales inválidas" })
    }

    const payload: IPayload = {
      _id: foundUser._id,
      username: foundUser.username,
      email: foundUser.email
    }

    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" })

    return res.json({ success: true, data: token })
  } catch (error) {
    const err = error as Error
    return res.status(500).json({ success: false, error: err.message })
  }
}