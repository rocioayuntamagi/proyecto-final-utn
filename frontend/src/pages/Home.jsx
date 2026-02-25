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
  const [searchName, setSearchName] = useState("");
  const [searchCategory, setSearchCategory] = useState("");
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

   const applyFilters = () => {
    let query = "?";

    if (searchName) query += `name=${searchName}&`;
    if (searchCategory) query += `category=${searchCategory}&`;

    fetchingProducts(query);
   };

const applyPage = (page) => {
  let query = `?page=${page}&`;

  if (searchName) query += `name=${searchName}&`;
  if (searchCategory) query += `category=${searchCategory}&`;

  fetchingProducts(query);
};

  useEffect(() => {
  fetchingProducts("?page=1")
}, [])

  return (
  <div className="home-container">
    {/* Header */}
    <Header />

    {/* Banner */}
    <section className="home-banner">
      <h2>Descubre Nuestros Productos Exclusivos</h2>
      <p>Alta calidad, precios accesibles y entrega rápida.</p>
      <h2>Usuario logueado: {user}</h2>
    </section>

    {/* Catálogo de Productos */}
    <main id="catalog">
      <div className="catalog-header">
        <h1>Catálogo de Productos</h1>
        <button className="btn-add-product" onClick={handleToggleForm}>
          + Agregar Nuevo Producto
        </button>
      </div>

      {/* Filtros de búsqueda */}
<div className="filters">
  <input
    type="text"
    placeholder="Buscar por nombre..."
    value={searchName}
    onChange={(e) => setSearchName(e.target.value)}
  />

  <input
    type="text"
    placeholder="Categoría..."
    value={searchCategory}
    onChange={(e) => setSearchCategory(e.target.value)}
  />

  <button onClick={applyFilters}>
    Buscar
  </button>
</div>

      {/* Formulario de Producto */}
      {showForm && (
        <div className="form-overlay">
          <div className="product-form">
            <h2>{editingProduct ? 'Editar Producto' : 'Agregar Nuevo Producto'}</h2>
            <form onSubmit={handleSubmit}>

              <div className="form-group">
                <label>Nombre</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Nombre del producto"
                />
              </div>

              <div className="form-group">
                <label>Precio</label>
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
                <label>Descripción</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows="4"
                  placeholder="Descripción del producto"
                />
              </div>

              <div className="form-group">
                <label>Categoría</label>
                <input
                  type="text"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  placeholder="Electrónica, Ropa, etc."
                />
              </div>

              <div className="form-actions">
                <button type="submit" className="btn-submit">
                  {editingProduct ? 'Actualizar Producto' : 'Crear Producto'}
                </button>
                <button type="button" className="btn-cancel" onClick={handleToggleForm}>
                  Cancelar
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

      {/* Lista de Productos */}
      <div className="product-list">
        {products.length === 0 && (
          <p className="no-products">No hay productos disponibles.</p>
        )}

        {products.map((product) => (
          <div key={product._id} className="product-card">
            <h2>{product.name}</h2>
            <p className="product-price">${product.price}</p>
            <p><strong>Stock:</strong> {product.stock}</p>
            <p><strong>Descripción:</strong> {product.description}</p>
            <p className="product-category">{product.category}</p>

            <div className="product-actions">
              <button className="btn-edit" onClick={() => handleEdit(product)}>
                ✏️ Editar
              </button>
              <button className="btn-delete" onClick={() => handleDelete(product._id)}>
                🗑️ Eliminar
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Paginación */}
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

    {/* Pie de página */}
    <footer className="home-footer">
      <p>&copy; 2026 Nuestra Tienda. Todos los derechos reservados.</p>
    </footer>
  </div>
);}

export default Home;