// src/services/auth.js (updated with requestPasswordReset)
import axios from 'axios';

const API_URL = 'https://vitatop.tecskill.com.br/rest.php';
const REST_KEY = '50119e057567b086d83fe5dd18336042ff2cf7bef3c24807bc55e34dbe5a';

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
});

// Add a request interceptor to include token in all requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor to handle token expiration
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem('token');
      window.location.href = '/';
    }
    return Promise.reject(error);
  }
);

// Login function - get token
export const login = async (username, password) => {
  try {
    const response = await axios.get(API_URL, {
      params: {
        class: 'ApplicationAuthenticationRestService',
        method: 'getToken',
        login: username,
        password: password
      },
      headers: {
        Authorization: `Basic ${REST_KEY}`
      }
    });

    if (response.data && response.data.status === 'success') {
      // Store token in localStorage
      localStorage.setItem('token', response.data.data);
      return response.data.data;
    } else {
      throw new Error(response.data?.message || 'Falha na autenticação');
    }
  } catch (error) {
    console.error('Erro no login:', error.response?.data || error.message);
    throw new Error(error.response?.data?.message || 'Erro ao conectar com o servidor');
  }
};

// Get user info
export const getUserInfo = async () => {
  try {
    const token = localStorage.getItem('token');
    
    if (!token) {
      throw new Error('Usuário não autenticado');
    }
    
    const response = await axios.post(API_URL, {
      class: 'PessoaRest',
      method: 'load',
      id: 1
    }, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    if (response.data && response.data.status === 'success') {
      return response.data.data;
    } else {
      throw new Error(response.data?.message || 'Falha ao obter dados do usuário');
    }
  } catch (error) {
    console.error('Erro ao obter dados do usuário:', error.response?.data || error.message);
    throw new Error(error.response?.data?.message || 'Erro ao conectar com o servidor');
  }
};

// Request password reset
export const requestPasswordReset = async (email) => {
  try {
    // In a real app, this would be a call to your backend
    // For demo purposes, we'll simulate a successful response
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Simple email validation
    if (!email || !email.includes('@')) {
      throw new Error('Email inválido');
    }
    
    // Simulate successful response
    return {
      status: 'success',
      message: 'Email de recuperação enviado com sucesso'
    };
  } catch (error) {
    console.error('Erro ao solicitar recuperação de senha:', error);
    throw new Error(error.message || 'Erro ao solicitar recuperação de senha');
  }
};

// Logout
export const logout = () => {
  localStorage.removeItem('token');
  return Promise.resolve();
};

// Check if user is authenticated
export const isAuthenticated = () => {
  return localStorage.getItem('token') !== null;
};

export default api;