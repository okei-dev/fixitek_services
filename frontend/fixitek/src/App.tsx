import { BrowserRouter } from "react-router-dom"
import Register from "./features/auth/Register"
import AppRoutes from "./routes/AppRoutes"
import { CartProvider } from "./features/cart/cartContext"

const App = () => {
  return (
    <BrowserRouter>
    <CartProvider>
      <AppRoutes />
    </CartProvider>
    </BrowserRouter>
  )
}

export default App