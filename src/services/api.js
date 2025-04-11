import axios from 'axios';

const API_URL = 'https://fakestoreapi.com';

// fetch(`${API_URL}/products`)
//   .then(response => response.json())
//   .then(data => {
//     console.log('All Products:', data); // ✅ Will show array of products
//   })
//   .catch(error => {
//     console.error('Error fetching data:', error);
//   });


// Create axios instance
const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for API calls
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Define API services
const apiService = {
  // Auth services
  login: async (username, password) => {
    try {
      const response = await apiClient.post('/auth/login', { username, password });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Product services
  getAllProducts: async () => {
    try {
      const response = await apiClient.get('/products');
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getProductById: async (id) => {
    try {
      const response = await apiClient.get(`/products/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getProductsByCategory: async (category) => {
    try {
      const response = await apiClient.get(`/products/category/${category}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getAllCategories: async () => {
    try {
      const response = await apiClient.get('/products/categories');
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  
  getUserCart: async (userId) => {
    try {
      const response = await apiClient.get(`/carts/user/${userId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  addToCart: async (productData) => {
    try {
      // In a real app, this would be a POST request
      // But we're handling cart in context for this project
      return productData;
    } catch (error) {
      throw error;
    }
  },
};

export default apiService;