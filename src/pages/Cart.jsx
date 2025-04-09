import { useCart } from '../context/CartContext';
import CartItem from '../components/CartItem';

const Cart = () => {
  const { cartItems, getTotalPrice, handleCheckout } = useCart();
  const totalPrice = getTotalPrice();

  return (
    <div className="cart-container">
      <div className="cart-header">
        <h1>Your Cart</h1>
        <span>{cartItems.length} item(s)</span>
      </div>

      {cartItems.length === 0 ? (
        <div className="empty-cart">
          <p>Your cart is empty</p>
          <p>Add some products to your cart!</p>
        </div>
      ) : (
        <>
          <div className="cart-items">
            {cartItems.map(item => (
              <CartItem key={item.id} item={item} />
            ))}
          </div>

          <div className="cart-summary">
            <div className="cart-total">
              <span>Total:</span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>

            <button 
              className="btn-primary checkout-btn"
              onClick={handleCheckout}
            >
              Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;