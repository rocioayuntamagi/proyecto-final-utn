import { BrowserRouter, Routes, Route } from "react-router-dom"

import Home from "../pages/Home"
import Login from "../pages/Login"
import Register from "../pages/Register"
import { About } from "../pages/About"
import { ProtectedRoute } from "../components/ProtectedRoute"

const RouterApp = () => {
  return (
    <BrowserRouter>
      <Routes>


        {/* Página principal */}
        <Route path="/" element={<Home />} />
        {/* About Us */}
        <Route path="/about" element={<About />} />

        {/* Login y Register */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Catálogo protegido */}
        <Route
          path="/catalog"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />

      </Routes>
    </BrowserRouter>
  )
}

export default RouterApp