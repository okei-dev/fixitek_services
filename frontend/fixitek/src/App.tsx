import { BrowserRouter } from "react-router-dom"
import AppRoutes from "./routes/AppRoutes"
import { CartProvider } from "./features/cart/cartContext"
import { AuthProvider } from "./features/auth/AuthProvider"

const App = () => {
  return (
    <BrowserRouter>
      <CartProvider>
        <AuthProvider>
          <AppRoutes />
        </AuthProvider>
      </CartProvider>
    </BrowserRouter>
  )
}

export default App