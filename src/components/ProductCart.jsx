import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
  return (
    <div className="product-card">
      <Link to={`/products/${product.id}`} className="product-link">
        <img 
          src={product.image} 
          alt={product.title} 
          className="product-image" 
        />
        
        <div className="product-info">
          <h3 className="product-title">{product.title}</h3>
          <span className="product-category">{product.category}</span>
          <span className="product-price">${product.price.toFixed(2)}</span>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;