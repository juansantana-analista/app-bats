// src/pages/Home.jsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import { getUserInfo } from '../services/auth';

export default function Home() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = await getUserInfo();
        setUser(userData);
      } catch (error) {
        console.error("Erro ao carregar dados do usuário:", error);
        // Redirect to login if user data can't be fetched (token invalid/expired)
        navigate('/');
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [navigate]);

  const navigateToSection = (path) => {
    navigate(path);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Header userName={user?.name} />
      
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-semibold text-gray-900 mb-6">Rastreamento de Baterias</h1>
        
        <div className="grid grid-cols-2 gap-4 mb-8">
          <div 
            onClick={() => navigateToSection('/factory')} 
            className="bg-white rounded-lg shadow p-6 flex flex-col items-center cursor-pointer hover:bg-gray-50 transition-colors"
          >
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <h2 className="text-lg font-medium text-gray-900">Cadastro na Fábrica</h2>
            <p className="text-sm text-gray-500 text-center mt-1">Registrar nova bateria na linha de produção</p>
          </div>
          
          <div 
            onClick={() => navigateToSection('/store')} 
            className="bg-white rounded-lg shadow p-6 flex flex-col items-center cursor-pointer hover:bg-gray-50 transition-colors"
          >
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </div>
            <h2 className="text-lg font-medium text-gray-900">Entrada na Loja</h2>
            <p className="text-sm text-gray-500 text-center mt-1">Registrar recebimento de bateria na loja</p>
          </div>
          
          <div 
            onClick={() => navigateToSection('/venda')} 
            className="bg-white rounded-lg shadow p-6 flex flex-col items-center cursor-pointer hover:bg-gray-50 transition-colors"
          >
            <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mb-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h2 className="text-lg font-medium text-gray-900">Registro de Venda</h2>
            <p className="text-sm text-gray-500 text-center mt-1">Iniciar garantia após venda ao cliente</p>
          </div>
          
          <div 
            onClick={() => navigateToSection('/warranty')} 
            className="bg-white rounded-lg shadow p-6 flex flex-col items-center cursor-pointer hover:bg-gray-50 transition-colors"
          >
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h2 className="text-lg font-medium text-gray-900">Verificar Garantia</h2>
            <p className="text-sm text-gray-500 text-center mt-1">Consultar status e histórico de garantia</p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-4">
          <h3 className="text-lg font-medium text-gray-900 mb-3">Escanear QR Code</h3>
          <button 
            onClick={() => navigateToSection('/scan')}
            className="w-full bg-blue-600 text-white py-3 rounded-md font-medium hover:bg-blue-700 transition-colors flex items-center justify-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
            </svg>
            Escanear QR Code da Bateria
          </button>
        </div>
      </div>
    </div>
  );
}