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
      <h1>Welcome to Our Store</h1>
      <nav>
        <ul>
          {token && (
            <li className="user-label">Hola, {typeof user === 'object' && user !== null ? (user.name || user.email || "Usuario") : (user || "Usuario")}</li>
          )}
          <li><Link to="/about">About Us</Link></li>
          {token && (
            <>
              <li><Link to="/catalog">Catalog</Link></li>
              <li>
                <button className="logout-btn" onClick={handleLogout}>
                  Cerrar sesión
                </button>
              </li>
            </>
          )}
          {!token && (
            <li><Link to="/login">Login</Link></li>
          )}
        </ul>
      </nav>
    </header>
  )
}

export { Header }