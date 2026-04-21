import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import CartSidebar from './components/Cart/CartSidebar';
import Home from './pages/Home';
import Store from './pages/Store';
import ProductDetail from './pages/ProductDetail';
import AboutUs from './pages/AboutUs';
import Reviews from './pages/Reviews';
import Terms from './pages/Terms';
import Login from './pages/Login';
import Register from './pages/Register';
import Checkout from './pages/Checkout';
import './App.css';

function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <Router>
      <div className="app-container">
        <Navbar onOpenCart={() => setIsCartOpen(true)} />
        <CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/tienda" element={<Store />} />
            <Route path="/hombre" element={<Store />} />
            <Route path="/mujer" element={<Store />} />
            <Route path="/sobre-nosotros" element={<AboutUs />} />
            <Route path="/resenas" element={<Reviews />} />
            <Route path="/terminos" element={<Terms />} />
            <Route path="/login" element={<Login />} />
            <Route path="/registro" element={<Register />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/producto/:id" element={<ProductDetail />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
