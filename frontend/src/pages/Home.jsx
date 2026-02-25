import { useEffect, useState } from 'react';
import { Header } from '../components/Header';
import '../styles/Home.css';
import { generatePopup } from '../utils/popup';
import { useNavigate } from "react-router-dom";
import { createProduct, deleteProduct, getProducts, updateProduct } from '../services/api.js';
import { useAuth } from '../context/AuthContext.jsx';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [pagination, setPagination] = useState(null);
 const [formData, setFormData] = useState({
  name: '',
  price: '',
  stock: '',
  description: '',
  category: ''
})

  const { user, token } = useAuth();
  const navigate = useNavigate();

  // Obtener productos
  const fetchingProducts = async (query = "?page=1") => {
    try {
      const json = await getProducts(token, query);

      if (!json.success) {
        const confirm = await generatePopup({
          textTitle: "Error al obtener los productos",
          textContent: json.error,
          icon: "error",
          showCancelButton: false,
          btnConfirm: "Cerrar"
        });

        if (confirm.isConfirmed) {
          navigate("/login");
        }
        return;
      }

      setProducts(json.data);
      setPagination(json.pagination);
    } catch (error) {
      console.log(error);
    }
  };

  const handleToggleForm = () => {
    setShowForm(prev => !prev);
  };

  // Crear o actualizar producto
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name } = formData;

    if (!name) {
      alert("🚧 El nombre del producto debe ser obligatorio");
      return;
    }

    if (!editingProduct) {
      // CREAR PRODUCTO
      const json = await createProduct(formData, token);

      if (!json.success) {
        alert(json.error);
        return;
      }

      fetchingProducts();
      setShowForm(false);

      await generatePopup({
        textTitle: "Producto agregado 🎉",
        textContent: `ID: ${json.data._id} ✅`,
        icon: "success",
        showCancelButton: false,
        btnConfirm: "OK",
      });

    } else {
      // EDITAR PRODUCTO
      const json = await updateProduct(editingProduct, formData, token);

      if (!json.success) {
        alert(json.error);
        return;
      }

      fetchingProducts();
      setEditingProduct(null);
      setShowForm(false);

      await generatePopup({
        textTitle: "Producto actualizado 🎉",
        textContent: `ID: ${json.data._id} ✅`,
        icon: "success",
        showCancelButton: false,
        btnConfirm: "Cerrar",
      });
    }

    // Reset form
    setFormData({
      name: '',
      price: '',
      stock: '',
      description: '',
      category: ''
    });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Eliminar producto
  const handleDelete = async (id) => {
    const validateDelete = await generatePopup({
      textTitle: "Borrar producto",
      textContent: "¿Estás seguro que quieres borrar el producto?",
      icon: "warning",
      showCancelButton: true,
      btnConfirm: "Borrar"
    });

    if (validateDelete.isConfirmed) {
      await deleteProduct(id, token);
      fetchingProducts();
    }
  };

  // Editar producto
  const handleEdit = (product) => {
    setShowForm(true);
    setFormData({
      name: product.name,
      price: product.price,
      stock: product.stock,
      description: product.description,
      category: product.category
    });
    setEditingProduct(product);
  };


const applyPage = (page) => {
  fetchingProducts(`?page=${page}`)
}

  useEffect(() => {
  fetchingProducts("?page=1")
}, [])

  return (
  <div className="home-container">
    {/* Header */}
    <Header />

    {/* Banner */}
    <section className="home-banner">
      <h2>Discover Our Exclusive Products</h2>
      <p>High quality, affordable prices, and fast delivery.</p>
      <h2>Usuario logueado: {user}</h2>
    </section>

    {/* Product Catalog */}
    <main id="catalog">
      <div className="catalog-header">
        <h1>Product Catalog</h1>
        <button className="btn-add-product" onClick={handleToggleForm}>
          + Add New Product
        </button>
      </div>

      {/* Product Form */}
      {showForm && (
        <div className="form-overlay">
          <div className="product-form">
            <h2>{editingProduct ? 'Edit Product' : 'Add New Product'}</h2>
            <form onSubmit={handleSubmit}>

              <div className="form-group">
                <label>Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Product name"
                />
              </div>

              <div className="form-group">
                <label>Price</label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  min="0"
                  step="0.01"
                  placeholder="0.00"
                />
              </div>

              <div className="form-group">
                <label>Stock</label>
                <input
                  type="number"
                  name="stock"
                  value={formData.stock}
                  onChange={handleChange}
                  min="0"
                  placeholder="0"
                />
              </div>

              <div className="form-group">
                <label>Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows="4"
                  placeholder="Product description"
                />
              </div>

              <div className="form-group">
                <label>Category</label>
                <input
                  type="text"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  placeholder="Electronics, Clothing, etc."
                />
              </div>

              <div className="form-actions">
                <button type="submit" className="btn-submit">
                  {editingProduct ? 'Update Product' : 'Create Product'}
                </button>
                <button type="button" className="btn-cancel" onClick={handleToggleForm}>
                  Cancel
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

      {/* Product List */}
      <div className="product-list">
        {products.length === 0 && (
          <p className="no-products">No hay productos disponibles.</p>
        )}

        {products.map((product) => (
          <div key={product._id} className="product-card">
            <h2>{product.name}</h2>
            <p className="product-price">${product.price}</p>
            <p><strong>Stock:</strong> {product.stock}</p>
            <p><strong>Description:</strong> {product.description}</p>
            <p className="product-category">{product.category}</p>

            <div className="product-actions">
              <button className="btn-edit" onClick={() => handleEdit(product)}>
                ✏️ Edit
              </button>
              <button className="btn-delete" onClick={() => handleDelete(product._id)}>
                🗑️ Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      {pagination && (
        <div className="pagination">
          <button
            disabled={pagination.page === 1}
            onClick={() => applyPage(pagination.page - 1)}
          >
            ◀ Anterior
          </button>

          <span>Página {pagination.page} de {pagination.pages}</span>

          <button
            disabled={pagination.page === pagination.pages}
            onClick={() => applyPage(pagination.page + 1)}
          >
            Siguiente ▶
          </button>
        </div>
      )}

    </main>

    {/* Footer */}
    <footer className="home-footer">
      <p>&copy; 2026 Our Store. All rights reserved.</p>
    </footer>
  </div>
);}

export default Home;