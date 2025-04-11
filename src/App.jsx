import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Header from './components/Header';
import Login from './pages/Login';
import ProductList from './pages/ProductList';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import Footer from './components/Footer';
import NotFound from './pages/NotFound';
import Notification from './components/Notification';
import { useCart } from './context/CartContext';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { notification } = useCart();

  useEffect(() => {
    // Check if token exists in localStorage
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  // Function to handle login
  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  // Function to handle logout
  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
  };

  return (
    <Router>
      {isAuthenticated && <Header onLogout={handleLogout} />}
      
      {notification.show && (
        <Notification 
          message={notification.message} 
          type={notification.type} 
        />
      )}
      
      <div className="container">
        <Routes>
          <Route 
            path="/" 
            element={isAuthenticated ? <ProductList /> : <Navigate to="/login" />} 
          />
          <Route 
            path="/login" 
            element={isAuthenticated ? <Navigate to="/" /> : <Login onLogin={handleLogin} />} 
          />
          <Route 
            path="/products/:id" 
            element={isAuthenticated ? <ProductDetails /> : <Navigate to="/login" />} 
          />
          <Route 
            path="/cart" 
            element={isAuthenticated ? <Cart /> : <Navigate to="/login" />} 
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
      {isAuthenticated && <Footer />}
    </Router>
  );
}

export default App;