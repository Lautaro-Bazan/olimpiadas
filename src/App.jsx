import { Footer } from "./components/layouts/footer/Footer";
import { ItemListContainer } from "./components/pages/itemListContainer/ItemListContainer";
import { Navbar } from "./components/layouts/navbar/Navbar";
import { ItemDetail } from "./components/pages/itemDetail/ItemDetail";
import { Home } from "./components/pages/home/Home";
import { Cart } from "./components/pages/cart/Cart";

//AUTH
import { Login, Register, ForgotPassword, NewPassword, User } from "./components/pages/auth";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./routes/ProtectedRoute";
import ProtectedAdminRoute from "./routes/ProtectedAdminRoute";


//ADMIN
import { Dashboard } from "./components/pages/dashboard/dashboard";
import { ProductForm } from "./components/pages/dashboard/products/addProduct";
import { EditProductForm } from "./components/pages/dashboard/products/editProduct";
import { HistoricalOrderDetails } from "./components/pages/dashboard/orders/historicalOrderDetails"
import { OrderDetailsScreen } from "./components/pages/dashboard/orders/viewEditOrder"


import { Checkout } from "./components/pages/checkout/Checkout";
import { CartContextProvider } from "./context/CartContext";

import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="app-wrapper">
      <BrowserRouter>
        <AuthProvider>
          <CartContextProvider>
            <Navbar />
            <main className="content">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/tienda" element={<ItemListContainer />} />
                <Route path="/tienda/:name" element={<ItemListContainer />} />
                <Route path="/detalle/:id" element={<ItemDetail />} />
                <Route path="/carrito" element={<Cart />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/restablecer-password" element={<NewPassword />} />

                {/* Ruta protegida */}
                <Route element={<ProtectedRoute />}>
                  <Route path="/pagos" element={<Checkout />} />
                   <Route path="/usuario" element={<User/>} />
                </Route>

                <Route element={<ProtectedAdminRoute />}>
                  <Route path="/dashboard" element={<Dashboard/>} />
                  <Route path="/dashboard/agregar-producto" element={<ProductForm/>} />
                  <Route path="/dashboard/editar-producto/:id" element={<EditProductForm />} />
                  <Route path="/dashboard/historial-orden/:id" element={<HistoricalOrderDetails />} />
                  <Route path="/dashboard/editar-orden/:id" element={<OrderDetailsScreen />} />
                </Route>

                <Route path="*" element={<h1>404 not found</h1>} />
              </Routes>
            </main>
            <Footer />
          </CartContextProvider>
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App
