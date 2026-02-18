import { createContext, useContext, useEffect, useState } from "react"

const AuthContext = createContext()

const BASE_API = "http://localhost:50000/auth"


const AuthProvider = ({ children }) => {
  const [user, setUser] = useState("Gabriel")
  const [token, setToken] = useState(localStorage.getItem("token") || null)

  useEffect(() => {
  const storedToken = localStorage.getItem("token");
  if (storedToken) setToken(storedToken);
}, []);

const authContextLogin = async (credentials) => {
  try {
    const res = await fetch(`${BASE_API}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(credentials)
    });

    if (!res.ok) return false;

    const json = await res.json();

    // Guarda token en localStorage
    localStorage.setItem("token", json.data);

    // Actualiza estado para que React se entere
    setToken(json.data);

    // Si tu backend devuelve usuario, guardalo
    if (json.user) setUser(json.user);

    return true;

  } catch (error) {
    console.error("Error en login:", error);
    return false;
  }
};

  const authContextRegister = async (userData) => {
    const res = await fetch(`${BASE_API}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(userData)
    })

    return res
  }

  const authContextLogout = () => {
    localStorage.removeItem("token")
    setToken("")
  }

  return (
    <AuthContext.Provider value={{ token, user, setUser, authContextLogin, authContextRegister, authContextLogout }}>
      {children}
    </AuthContext.Provider>
  )
}

// custom hook
const useAuth = () => {
  return useContext(AuthContext)
}

export { AuthProvider, useAuth }