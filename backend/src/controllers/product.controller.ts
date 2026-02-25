import { Request, Response } from "express"
import { Product } from "../models/product.model"
import mongoose from "mongoose"
import { productPartialValidate, productValidate } from "../schemas/product.schema"

export const getProducts = async (req: Request, res: Response) => {
  try {
    // PAGINACIÓN
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    // FILTROS 
    const { name, category } = req.query;

    const filters: any = { user: req.user._id };

    if (name) {
      filters.name = { $regex: name as string, $options: "i" };
    }

    if (category) {
      filters.category = category;
    }

    // CONSULTA
    const [products, total] = await Promise.all([
      Product.find(filters)
        .sort({ _id: -1 })
        .skip(skip)
        .limit(limit),

      Product.countDocuments(filters)
    ]);

    const totalPages = Math.ceil(total / limit);

    return res.json({
      success: true,
      data: products,
      pagination: {
        total,
        page,
        limit,
        pages: totalPages,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1
      }
    });
  } catch (error) {
    const err = error as Error;
    return res.status(500).json({ success: false, error: err.message });
  }
};

export const getProductById = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        error: "ID incorrecto, ingresa un valor válido"
      });
    }

    const product = await Product.findOne({
      _id: id,
      user: req.user._id
    });

    if (!product) {
      return res.status(404).json({
        success: false,
        error: "No existe el producto"
      });
    }

    return res.json({ success: true, data: product });
  } catch (error) {
    const err = error as Error;
    return res.status(500).json({ success: false, error: err.message });
  }
}

export const createProduct = async (req: Request, res: Response) => {
  try {
    const body = req.body

    const validate = productValidate.safeParse(body)
    if (!validate.success) {
      return res.status(400).json({ success: false, error: validate.error.flatten().fieldErrors })
    }

    const createdProduct = await Product.create({
      ...body,
      user: req.user._id
    })

    return res.status(201).json({ success: true, data: createdProduct })
  } catch (error) {
    const err = error as Error
    return res.status(500).json({ success: false, error: err.message })
  }
}

export const updateProduct = async (req: Request, res: Response) => {
  try {
    const id = req.params.id
    const updates = req.body

    const validate = productPartialValidate.safeParse(updates)
    if (!validate.success) {
      return res.status(400).json({ success: false, error: validate.error.flatten().fieldErrors })
    }

    const updatedProduct = await Product.findOneAndUpdate(
      { _id: id, user: req.user._id },
      updates,
      { new: true }
    )

    if (!updatedProduct) {
      return res.status(404).json({ success: false, error: "no existe el producto para actualizar" })
    }

    return res.json({ success: true, data: updatedProduct })
  } catch (error) {
    const err = error as Error
    return res.status(500).json({ success: false, error: err.message })
  }
}

export const deleteProduct = async (req: Request, res: Response) => {
  const id = req.params.id as string

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({
      success: false,
      error: "ID incorrecto, ingresa un valor válido"
    })
  }

  try {
    const deletedProduct = await Product.findOneAndDelete({
      _id: id,
      user: req.user._id
    })

    if (!deletedProduct) {
      return res.status(404).json({ success: false, error: "no existe el producto para borrar" })
    }

    return res.json({ success: true, data: deletedProduct })
  } catch (error) {
    const err = error as Error
    return res.status(500).json({ success: false, error: err.message })
  }
}