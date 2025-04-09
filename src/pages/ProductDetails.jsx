import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import apiService from '../services/api';
import { useCart } from '../context/CartContext';
import Loader from '../components/Loader';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProduct = async () => {
      setIsLoading(true);
      try {
        const data = await apiService.getProductById(id);
        setProduct(data);
      } catch (error) {
        console.error('Error fetching product details:', error);
        setError('Failed to load product details. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    addToCart(product);
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div className="product-detail">
      <button className="btn-outline" onClick={handleGoBack} style={{ marginBottom: '1rem' }}>
        ← Back
      </button>
      
      <div className="product-detail-container">
        <div className="product-detail-image-container">
          <img 
            src={product.image} 
            alt={product.title} 
            className="product-detail-image"
          />
        </div>
        
        <div className="product-detail-info">
          <h1>{product.title}</h1>
          
          <span className="product-detail-category">
            {product.category}
          </span>
          
          <p className="product-detail-price">
            ${product.price.toFixed(2)}
          </p>
          
          <div className="product-detail-description">
            {product.description}
          </div>
          
          <button 
            className="btn-primary add-to-cart-btn"
            onClick={handleAddToCart}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;