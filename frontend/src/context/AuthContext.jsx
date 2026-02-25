import { createContext, useContext, useEffect, useState } from "react"

const AuthContext = createContext()

const BASE_API = "http://localhost:50000/auth"

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(localStorage.getItem("token") || null)

  // Mantener token al recargar la página
  useEffect(() => {
    const storedToken = localStorage.getItem("token")
    if (storedToken) setToken(storedToken)
  }, [])

  // LOGIN
  const authContextLogin = async (credentials) => {
    try {
      const res = await fetch(`${BASE_API}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(credentials)
      })

      if (!res.ok) return false

      const json = await res.json()

      // Guardar token
      localStorage.setItem("token", json.data)
      setToken(json.data)

      // Si el backend devuelve usuario, guardarlo
      if (json.user) {
        setUser(json.user)
      } else if (json.username || json.name || json.email) {
        // Si el backend devuelve los datos del usuario plano
        setUser({
          username: json.username,
          name: json.name,
          email: json.email
        })
      }

      return true

    } catch (error) {
      console.error("Error en login:", error)
      return false
    }
  }

  // REGISTER
  const authContextRegister = async (userData) => {
    try {
      const res = await fetch(`${BASE_API}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(userData)
      })

      // Si el registro fue exitoso y el backend devuelve el usuario, guardarlo
      if (res.ok) {
        try {
          const json = await res.json();
          if (json.user) setUser(json.user);
        } catch (e) {
          // Si no hay json o user, no hacer nada
        }
      }
      return res
    } catch (error) {
      console.error("Error en register:", error)
      return null
    }
  }

  // LOGOUT
  const authContextLogout = () => {
    localStorage.removeItem("token")
    setToken(null)
    setUser(null)
  }

  return (
    <AuthContext.Provider
      value={{
        token,
        user,
        setUser,
        authContextLogin,
        authContextRegister,
        authContextLogout
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

// Custom hook
const useAuth = () => useContext(AuthContext)

export { AuthProvider, useAuth }