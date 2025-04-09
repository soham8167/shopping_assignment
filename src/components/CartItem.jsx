import { useCart } from '../context/CartContext';

const CartItem = ({ item }) => {
  const { updateQuantity, removeFromCart } = useCart();

  return (
    <div className="cart-item">
      <img 
        src={item.image} 
        alt={item.title} 
        className="cart-item-image" 
      />
      
      <div className="cart-item-details">
        <h3>{item.title}</h3>
        <span className="cart-item-price">${(item.price * item.quantity).toFixed(2)}</span>
      </div>
      
      <div className="cart-item-actions">
        <button 
          className="btn-outline"
          onClick={() => updateQuantity(item.id, item.quantity - 1)}
          disabled={item.quantity <= 1}
        >
          -
        </button>
        
        <span className="cart-item-quantity">{item.quantity}</span>
        
        <button 
          className="btn-outline"
          onClick={() => updateQuantity(item.id, item.quantity + 1)}
        >
          +
        </button>
        
        <button 
          className="btn-danger"
          onClick={() => removeFromCart(item.id)}
        >
          Remove
        </button>
      </div>
    </div>
  );
};

export default CartItem;