import { useState } from 'react';
import apiService from '../services/api';
import Loader from '../components/Loader';

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate inputs
    if (!username || !password) {
      setError('Please enter both username and password');
      return;
    }
    
    setIsLoading(true);
    setError('');
    
    try {
      // Check for custom credentials
      if (username === 'soham' && password === '2143') {
        // Create a fake token for custom login
        localStorage.setItem('token', 'custom_token_for_soham');
        onLogin();
        return;
      }
      
      // If not using custom credentials, try the API
      const data = await apiService.login(username, password);
      
      // Store token in localStorage
      localStorage.setItem('token', data.token);
      
      // Update auth state
      onLogin();
    } catch (error) {
      console.error('Login error:', error);
      setError('Invalid username or password. Try "soham" and "2143"');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container">
      <h1 className="login-title">Sign In</h1>
      
      {error && <div className="error-message">{error}</div>}
      
      <form className="login-form" onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        
        <div>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        
        <button 
          type="submit" 
          className="btn-primary"
          disabled={isLoading}
        >
          {isLoading ? 'Signing in...' : 'Sign In'}
        </button>
      </form>
      
      {isLoading && <Loader />}
      
      <div style={{ marginTop: '20px', textAlign: 'center', fontSize: '0.8rem' }}>
        <p>For testing, use these credentials:</p>
        <p>Username: soham</p>
        <p>Password: 2143</p>
      </div>
    </div>
  );
};

export default Login;