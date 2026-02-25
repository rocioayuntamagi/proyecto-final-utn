import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"

const Header = () => {

  const { authContextLogout, token, user  } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    authContextLogout()
    navigate("/login")
  }

  return (
    <header className="home-header">
      <h1>Bienvenido a Nuestra Tienda</h1>
      <nav>
        <ul>
          {token && (
            <li className="user-label">Hola, {user && typeof user === 'object' && (user.username || user.name || user.email) ? (user.username || user.name || user.email) : (user || "Usuario")}</li>
          )}
          <li><Link to="/about">Sobre Nosotros</Link></li>
          {token && (
            <>
              <li><Link to="/catalog">Catálogo</Link></li>
              <li>
                <button className="logout-btn" onClick={handleLogout}>
                  Cerrar sesión
                </button>
              </li>
            </>
          )}
          {!token && (
            <li><Link to="/login">Iniciar sesión</Link></li>
          )}
        </ul>
      </nav>
    </header>
  )
}

export { Header }