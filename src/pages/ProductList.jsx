import { useState, useEffect } from 'react';
import apiService from '../services/api';
import ProductCart from '../components/ProductCart';
import Loader from '../components/Loader';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch products and categories on component mount
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        // Fetch all products
        const productsData = await apiService.getAllProducts();
        setProducts(productsData);
        setFilteredProducts(productsData);
        
        // Fetch all categories
        const categoriesData = await apiService.getAllCategories();
        setCategories(categoriesData);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Failed to load products. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  // Filter products by category
  const handleCategoryClick = async (category) => {
    setIsLoading(true);
    setSelectedCategory(category);
    
    try {
      let filteredProducts;
      
      if (category) {
        // Fetch products by category
        filteredProducts = await apiService.getProductsByCategory(category);
      } else {
        // If no category is selected, show all products
        filteredProducts = products;
      }
      
      setFilteredProducts(filteredProducts);
    } catch (error) {
      console.error('Error filtering products:', error);
      setError('Failed to filter products. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Handle search input change
  const handleSearchChange = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    
    // Filter products based on search query
    if (query.trim() === '') {
      // If search is empty, respect category filter
      handleCategoryClick(selectedCategory);
    } else {
      const searchResults = products.filter(product => 
        product.title.toLowerCase().includes(query) || 
        product.description.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query)
      );
      
      setFilteredProducts(searchResults);
    }
  };

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="products-container">
      <h1>Our Products</h1>
      
      {/* Search bar */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search products..."
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </div>
      
      {/* Category filters */}
      <div className="category-filter">
        <button 
          className={selectedCategory === '' ? 'active' : ''}
          onClick={() => handleCategoryClick('')}
        >
          All
        </button>
        
        {categories.map(category => (
          <button
            key={category}
            className={selectedCategory === category ? 'active' : ''}
            onClick={() => handleCategoryClick(category)}
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </button>
        ))}
      </div>
      
      {isLoading ? (
        <Loader />
      ) : (
        <>
          {filteredProducts.length === 0 ? (
            <p>No products found.</p>
          ) : (
            <div className="products-grid">
              {filteredProducts.map(product => (
                <ProductCart key={product.id} product={product} />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ProductList;