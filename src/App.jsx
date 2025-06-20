import { Footer } from "./components/layouts/footer/Footer";
import { ItemListContainer } from "./components/pages/itemListContainer/ItemListContainer";
import { Navbar } from "./components/layouts/navbar/Navbar";
import { ItemDetail } from "./components/pages/itemDetail/ItemDetail";
import { Home } from "./components/pages/home/Home";
import { Cart } from "./components/pages/cart/Cart";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Checkout } from "./components/pages/checkout/Checkout";
import { CartContextProvider } from "./context/CartContext";

function App() {
  return (
    <BrowserRouter>
      <CartContextProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/tienda" element={<ItemListContainer />}/>
          <Route path="/tienda/:name" element={<ItemListContainer />}/>
          <Route path="/detalle/:id" element={<ItemDetail />}/>
          <Route path="/carrito" element={<Cart />}/>
          <Route path="/pagos" element={<Checkout />}/>
          <Route path="*" element={<h1>404 not found</h1>}/>
        </Routes>
        <Footer />
      </CartContextProvider>
    
    </BrowserRouter>
  )
}

export default App
