import mongoose from "mongoose"

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, default: 0 },
  stock: { type: Number, default: 0 },
  description: { type: String, default: "Sin descripción" },
  category: { type: String, default: "Sin categoria" },

  // Relación con el usuario dueño del producto
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  }
}, {
  versionKey: false,
  timestamps: true
})

const Product = mongoose.model("Product", ProductSchema)

export { Product }