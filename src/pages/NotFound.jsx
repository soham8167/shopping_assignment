import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div style={{ textAlign: 'center', marginTop: '5rem' }}>
      <h1>404</h1>
      <h2>Page Not Found</h2>
      <p>The page you are looking for does not exist.</p>
      <Link to="/" className="btn-primary" style={{ display: 'inline-block', marginTop: '1rem' }}>
        Go to Home
      </Link>
    </div>
  );
};

export default NotFound;