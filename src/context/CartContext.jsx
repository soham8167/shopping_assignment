import { createContext, useState, useContext, useEffect } from 'react';

// Create context
const CartContext = createContext();

// Hook to use the cart context
export const useCart = () => {
  return useContext(CartContext);
};

// Provider component
export const CartProvider = ({ children }) => {
  // Initialize cart from localStorage if available
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });
  
  const [notification, setNotification] = useState({ show: false, message: '', type: '' });

  // Update localStorage whenever cart changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  // Add item to cart
  const addToCart = (product, quantity = 1) => {
    setCartItems(prevItems => {
      // Check if item is already in cart
      const existingItemIndex = prevItems.findIndex(item => item.id === product.id);
      
      if (existingItemIndex > -1) {
        // Update quantity if item exists
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          quantity: updatedItems[existingItemIndex].quantity + quantity
        };
        return updatedItems;
      } else {
        // Add new item if it doesn't exist
        return [...prevItems, { ...product, quantity }];
      }
    });
    
    // Show notification
    showNotification('Item added to cart!', 'success');
  };

  // Remove item from cart
  const removeFromCart = (productId) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
    showNotification('Item removed from cart.', 'success');
  };

  // Update item quantity
  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) return;
    
    setCartItems(prevItems => 
      prevItems.map(item => 
        item.id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  // Clear the entire cart
  const clearCart = () => {
    setCartItems([]);
  };

  // Calculate total price
  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  // Get total number of items
  const getItemCount = () => {
    return cartItems.reduce((count, item) => count + item.quantity, 0);
  };

  // Show notification
  const showNotification = (message, type = 'success') => {
    setNotification({ show: true, message, type });
    
    // Auto-hide notification after 3 seconds
    setTimeout(() => {
      setNotification({ show: false, message: '', type: '' });
    }, 3000);
  };

  // Checkout handler
  const handleCheckout = () => {
    clearCart();
    showNotification('Order placed successfully!', 'success');
  };

  const value = {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getTotalPrice,
    getItemCount,
    notification,
    handleCheckout
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};