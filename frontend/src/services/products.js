const API_URL = "http://localhost:50000"

export const getProducts = async (token, query = "") => {
  const res = await fetch(`${API_URL}/products${query}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  return res.json()
}

export const createProduct = async (token, data) => {
  const res = await fetch(`${API_URL}/products`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(data)
  })
  return res.json()
}

export const updateProduct = async (token, id, data) => {
  const res = await fetch(`${API_URL}/products/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(data)
  })
  return res.json()
}

export const deleteProduct = async (token, id) => {
  const res = await fetch(`${API_URL}/products/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  return res.json()
}