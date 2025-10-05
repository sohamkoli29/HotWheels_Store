import  { useState, useEffect } from 'react';
import { Search, Filter, ShoppingCart, Car, AlertCircle } from 'lucide-react';
import axios from 'axios';
import './App.css';

const API_BASE = import.meta.env.VITE_API_BASE + '/api';



function App() {
  const [hotwheels, setHotwheels] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [backendConnected, setBackendConnected] = useState(false);

  // Test backend connection on component mount
  useEffect(() => {
    testBackendConnection();
  }, []);

  useEffect(() => {
    if (backendConnected) {
      fetchHotWheels();
    }
  }, [searchTerm, sortBy, sortOrder, backendConnected]);

  const testBackendConnection = async () => {
    try {
      const response = await axios.get(`${API_BASE}/test`);
      setBackendConnected(true);
      setError('');
      console.log('Backend connection:', response.data);
    } catch (error) {
      setBackendConnected(false);
      setError('Backend server is not running. Please start the backend server on port 5000.');
      console.error('Backend connection failed:', error);
    }
  };

  const fetchHotWheels = async () => {
    if (!backendConnected) return;
    
    setLoading(true);
    setError('');
    try {
      const params = {};
      if (searchTerm) params.search = searchTerm;
      if (sortBy) params.sort = sortBy;
      if (sortOrder) params.order = sortOrder;

      const response = await axios.get(`${API_BASE}/hotwheels`, { 
        params,
        timeout: 5000
      });
      setHotwheels(response.data);
    } catch (error) {
      console.error('Error fetching hotwheels:', error);
      if (error.code === 'ECONNREFUSED') {
        setError('Cannot connect to backend server. Make sure it\'s running on port 5000.');
        setBackendConnected(false);
      } else {
        setError('Failed to load hotwheels. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const addToCart = (hotwheel) => {
    setCart([...cart, { ...hotwheel, cartId: Date.now() }]);
  };

  const removeFromCart = (cartId) => {
    setCart(cart.filter(item => item.cartId !== cartId));
  };

  const totalCartPrice = cart.reduce((total, item) => total + (item.price || 0), 0);

  return (
    <div className="app">
      <header className="header">
        <div className="container">
          <div className="logo">
            <Car className="logo-icon" />
            <h1>HotWheels Store</h1>
          </div>
          <div className="header-actions">
            <div className="cart">
              <ShoppingCart />
              <span className="cart-count">{cart.length}</span>
            </div>
          </div>
        </div>
      </header>

      {error && (
        <div className="error-banner">
          <div className="container">
            <AlertCircle size={20} />
            <span>{error}</span>
            {!backendConnected && (
              <button onClick={testBackendConnection} className="retry-btn">
                Retry Connection
              </button>
            )}
          </div>
        </div>
      )}

      <main className="main">
        <div className="container">
          <div className="filters">
            <div className="search-box">
              <Search className="search-icon" />
              <input
                type="text"
                placeholder="Search hotwheels by name, series, or color..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                disabled={!backendConnected}
              />
            </div>
            
            <div className="sort-filters">
              <Filter size={16} />
              <select 
                value={sortBy} 
                onChange={(e) => setSortBy(e.target.value)}
                disabled={!backendConnected}
              >
                <option value="name">Name</option>
                <option value="series">Series</option>
                <option value="price">Price</option>
                <option value="year">Year</option>
              </select>
              
              <select 
                value={sortOrder} 
                onChange={(e) => setSortOrder(e.target.value)}
                disabled={!backendConnected}
              >
                <option value="asc">Ascending</option>
                <option value="desc">Descending</option>
              </select>
            </div>
          </div>

          {loading ? (
            <div className="loading">Loading hotwheels...</div>
          ) : !backendConnected ? (
            <div className="connection-error">
              <h3>Backend Server Required</h3>
              <p>Please start the backend server to use the application:</p>
              <ol>
                <li>Open terminal in the backend directory</li>
                <li>Run: <code>npm run dev</code></li>
                <li>Wait for "Server running on http://localhost:5000"</li>
                <li>Refresh this page</li>
              </ol>
              <button onClick={testBackendConnection} className="retry-btn">
                Check Connection
              </button>
            </div>
          ) : (
            <div className="hotwheels-grid">
              {hotwheels.length === 0 ? (
                <div className="no-results">
                  <p>No hotwheels found.</p>
                  <p>Add cars directly to your Supabase database to see them here.</p>
                </div>
              ) : (
                hotwheels.map((hotwheel) => (
                  <div key={hotwheel.id} className="hotwheel-card">
                    <img 
                      src={hotwheel.image_url} 
                      alt={hotwheel.name}
                      className="hotwheel-image"
                      onError={(e) => {
                        e.target.src = 'https://images.unsplash.com/photo-1566474591190-88d7c4dbb13f?w=400';
                      }}
                    />
                    <div className="hotwheel-info">
                      <h3>{hotwheel.name}</h3>
                      <p className="series">{hotwheel.series}</p>
                      <p className="color">Color: {hotwheel.color}</p>
                      <p className="year">Year: {hotwheel.year}</p>
                      <div className="price-section">
                        <span className="price">${hotwheel.price}</span>
                        <button 
                          className="add-to-cart"
                          onClick={() => addToCart(hotwheel)}
                        >
                          Add to Cart
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </main>

      {cart.length > 0 && (
        <div className="cart-sidebar">
          <div className="cart-header">
            <h3>Shopping Cart ({cart.length})</h3>
            <button onClick={() => setCart([])}>Clear All</button>
          </div>
          <div className="cart-items">
            {cart.map((item) => (
              <div key={item.cartId} className="cart-item">
                <img 
                  src={item.image_url} 
                  alt={item.name}
                  onError={(e) => {
                    e.target.src = 'https://images.unsplash.com/photo-1566474591190-88d7c4dbb13f?w=100';
                  }}
                />
                <div className="cart-item-info">
                  <h4>{item.name}</h4>
                  <p>${item.price}</p>
                </div>
                <button 
                  onClick={() => removeFromCart(item.cartId)}
                  className="remove-btn"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
          <div className="cart-total">
            <strong>Total: ${totalCartPrice.toFixed(2)}</strong>
            <button className="checkout-btn">Checkout</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;