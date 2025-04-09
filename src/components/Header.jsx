import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const Header = ({ onLogout }) => {
  const { getItemCount } = useCart();
  const cartCount = getItemCount();

  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" className="logo">Shop-Now</Link>
        
        <nav className="nav-links">
          <Link to="/" className="nav-link">Home</Link>
          
          <Link to="/cart" className="nav-link cart-icon">
            Cart
            {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
          </Link>
          
          <button onClick={onLogout} className="nav-link" style={{ background: 'none', border: 'none' }}>
            Logout
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;