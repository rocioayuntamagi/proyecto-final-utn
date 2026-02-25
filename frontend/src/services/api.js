const BASE_API = "http://localhost:50000/products"

// GET ALL
const getProducts = async (token, query = "") => {
  const res = await fetch(`${BASE_API}${query}`, {
    method: "GET",
    headers: {
      Authorization: "Bearer " + token
    }
  })

  return res.json()
}

// CREATE
const createProduct = async (productData, token) => {
  const res = await fetch(BASE_API, {
    method: "POST",
    headers: {
      Authorization: "Bearer " + token,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(productData)
  })

  return res.json()
}

// UPDATE
const updateProduct = async (editingProduct, updates, token) => {
  const res = await fetch(`${BASE_API}/${editingProduct._id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token
    },
    body: JSON.stringify(updates)
  })

  return res.json()
}

// DELETE
const deleteProduct = async (id, token) => {
  const res = await fetch(`${BASE_API}/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: "Bearer " + token
    }
  })

  return res.json()
}

export { getProducts, createProduct, updateProduct, deleteProduct }