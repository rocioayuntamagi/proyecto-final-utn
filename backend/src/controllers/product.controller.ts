import { Request, Response } from "express"
import { Product } from "../models/product.model"
import mongoose from "mongoose"
import { productPartialValidate, productValidate } from "../validators/productValidator"

const getProducts = async (req: Request, res: Response) => {
  try {
    const products = await Product.find().sort({ _id: -1 })
    res.json({ success: true, data: products })
  } catch (error) {
    const err = error as Error
    res.status(500).json({ success: false, error: err.message })
  }
}

const createProduct = async (req: Request, res: Response) => {
  try {
    const body = req.body
    const { name, price, stock, category, description } = body

    // zod / joi / yup validaciones

    const validate = productValidate.safeParse(body)

    if (!validate.success) {
      return res.status(400).json({ success: false, error: validate.error.flatten().fieldErrors })
    }

    const createdProduct = await Product.create({ name, price, stock, category, description })

    res.status(201).json({ success: true, data: createdProduct })
  } catch (error) {
    const err = error as Error
    res.status(500).json({ success: false, error: err.message })
  }
}

const updateProduct = async (req: Request, res: Response) => {
  try {
    const id = req.params.id
    const updates = req.body

    const validate = productPartialValidate.safeParse(updates)

    if (!validate.success) {
      return res.status(400).json({ success: false, error: validate.error.flatten().fieldErrors })
    }

    const updatedProduct = await Product.findByIdAndUpdate(id, updates, { new: true })

    if (!updatedProduct) {
      return res.status(404).json({ success: false, error: "no existe el producto para actualizar" })
    }

    res.json({ success: true, data: updatedProduct })
  } catch (error) {
    const err = error as Error
    res.status(500).json({ success: false, error: err.message })
  }
}

const deleteProduct = async (req: Request, res: Response) => {

  // incorporar una validación de input
  const id = req.params.id as string

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({
      success: false,
      error: "ID incorrecto, ingresa un valor válido"
    })
  }


  try {
    const deletedProduct = await Product.findByIdAndDelete(id)
    if (!deletedProduct) {
      return res.status(404).json({ success: false, error: "no existe el producto para borrar" })
    }
    res.json({ success: true, data: deletedProduct })
  } catch (error) {
    const err = error as Error
    res.status(500).json({ success: false, error: err.message })
  }
}

export { getProducts, createProduct, updateProduct, deleteProduct }