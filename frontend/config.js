const API_CONFIG = {
  NODE_BACKEND: 'https://artify-backend.onrender.com/api',
  PYTHON_BACKEND: 'https://artify-python-backend.onrender.com/api'
};

const isProduction = window.location.hostname !== 'localhost';
const API_URL = isProduction ? API_CONFIG.NODE_BACKEND : 'http://localhost:3001/api';
const PYTHON_API_URL = isProduction ? API_CONFIG.PYTHON_BACKEND : 'http://localhost:8000/api';
