// src/pages/WarrantyCheck.jsx
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Header from '../components/Header';
import { checkBatteryWarranty, getBatteryHistory } from '../services/batteryService';

export default function WarrantyCheck() {
  const navigate = useNavigate();
  const location = useLocation();
  
  const [batteryCode, setBatteryCode] = useState('');
  const [warrantyData, setWarrantyData] = useState(null);
  const [historyData, setHistoryData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // If battery data is passed through navigation
  useEffect(() => {
    if (location.state?.batteryData) {
      const code = location.state.batteryData.code;
      setBatteryCode(code);
      if (code) {
        handleCheck(code);
      }
    }
  }, [location]);

  const handleCheck = (codeParam) => {
    const code = codeParam || batteryCode;
    
    if (!code) {
      setError('Por favor, digite o código da bateria');
      return;
    }
    
    setLoading(true);
    setError('');
    
    // For demo purposes, use mock data
    setTimeout(() => {
      setWarrantyData(getMockWarrantyData(code));
      setHistoryData(getMockHistoryData(code));
      setLoading(false);
    }, 1000);
    
    // In a real app, you would use the actual API call
    // checkActualWarranty(code);
  };

  const checkActualWarranty = async (code) => {
    try {
      const warrantyResult = await checkBatteryWarranty(code);
      setWarrantyData(warrantyResult);
      
      // Also fetch the battery history
      const historyResult = await getBatteryHistory(code);
      setHistoryData(historyResult);
    } catch (err) {
      setError(err.message || 'Erro ao verificar garantia. Tente novamente.');
      setWarrantyData(null);
      setHistoryData([]);
    } finally {
      setLoading(false);
    }
  };

  // For demo purposes - generate mock warranty data
  const getMockWarrantyData = (code) => {
    const today = new Date();
    const manufactureDate = new Date(today);
    manufactureDate.setMonth(today.getMonth() - 6);
    
    const saleDate = new Date(today);
    saleDate.setMonth(today.getMonth() - 2);
    
    const expiryDate = new Date(today);
    expiryDate.setMonth(today.getMonth() + 10);
    
    const isValid = today < expiryDate;
    
    return {
      batteryCode: code,
      model: "Premium " + code.substring(3, 5),
      manufactureDate: manufactureDate.toISOString().split('T')[0],
      saleDate: saleDate.toISOString().split('T')[0],
      warrantyPeriod: "12 meses",
      expiryDate: expiryDate.toISOString().split('T')[0],
      isValid: isValid,
      customerName: "Cliente Exemplo",
      storeName: "Loja Central",
      remainingDays: Math.floor((expiryDate - today) / (1000 * 60 * 60 * 24))
    };
  };

  // For demo purposes - generate mock history data
  const getMockHistoryData = (code) => {
    const today = new Date();
    const manufactureDate = new Date(today);
    manufactureDate.setMonth(today.getMonth() - 6);
    
    const storeDate = new Date(today);
    storeDate.setMonth(today.getMonth() - 3);
    
    const saleDate = new Date(today);
    saleDate.setMonth(today.getMonth() - 2);
    
    return [
      {
        date: manufactureDate.toISOString().split('T')[0],
        event: "Fabricação",
        location: "Fábrica Bats - Unidade Principal",
        details: "Bateria fabricada e registrada no sistema"
      },
      {
        date: storeDate.toISOString().split('T')[0],
        event: "Entrada na Loja",
        location: "Loja Central",
        details: "Bateria recebida em estoque"
      },
      {
        date: saleDate.toISOString().split('T')[0],
        event: "Venda ao Cliente",
        location: "Loja Central",
        details: "Bateria vendida e garantia iniciada"
      }
    ];
  };

  const getStatusColor = (isValid) => {
    return isValid ? 'bg-green-100 border-green-500 text-green-700' : 'bg-red-100 border-red-500 text-red-700';
  };

  const getStatusText = (isValid) => {
    return isValid ? 'Garantia Válida' : 'Garantia Expirada';
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-semibold text-gray-900 mb-6">Verificar Garantia</h1>
        
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <div className="flex flex-col md:flex-row md:items-end md:space-x-4">
            <div className="flex-grow mb-4 md:mb-0">
              <label htmlFor="batteryCode" className="block text-sm font-medium text-gray-700 mb-1">
                Código da Bateria
              </label>
              <input
                type="text"
                id="batteryCode"
                value={batteryCode}
                onChange={(e) => setBatteryCode(e.target.value)}
                placeholder="Digite o código da bateria"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <button
              onClick={() => handleCheck()}
              disabled={loading}
              className="bg-blue-600 text-white py-2 px-4 rounded font-medium hover:bg-blue-700 transition-colors disabled:opacity-50"
            >
              {loading ? 'Verificando...' : 'Verificar Garantia'}
            </button>
          </div>
          
          {error && (
            <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded mt-4" role="alert">
              <p>{error}</p>
            </div>
          )}
        </div>
        
        {loading && (
          <div className="bg-white rounded-lg shadow p-6 mb-6 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
            <p className="mt-4 text-gray-600">Verificando garantia...</p>
          </div>
        )}
        
        {!loading && warrantyData && (
          <>
            <div className="bg-white rounded-lg shadow p-6 mb-6">
              <div className={`border-l-4 p-4 rounded ${getStatusColor(warrantyData.isValid)} mb-6`}>
                <div className="flex flex-col md:flex-row md:justify-between md:items-center">
                  <h2 className="text-lg font-bold">{getStatusText(warrantyData.isValid)}</h2>
                  {warrantyData.isValid && (
                    <p className="text-green-800 mt-2 md:mt-0">
                      Restam <span className="font-bold">{warrantyData.remainingDays}</span> dias de garantia
                    </p>
                  )}
                </div>
              </div>
              
              <h3 className="text-lg font-medium text-gray-900 mb-4">Informações da Garantia</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                  <p className="text-sm text-gray-500">Código da Bateria</p>
                  <p className="font-medium">{warrantyData.batteryCode}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Modelo</p>
                  <p className="font-medium">{warrantyData.model}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Data de Fabricação</p>
                  <p className="font-medium">{warrantyData.manufactureDate}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Data da Venda</p>
                  <p className="font-medium">{warrantyData.saleDate}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Período de Garantia</p>
                  <p className="font-medium">{warrantyData.warrantyPeriod}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Data de Expiração</p>
                  <p className="font-medium">{warrantyData.expiryDate}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Cliente</p>
                  <p className="font-medium">{warrantyData.customerName}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Loja</p>
                  <p className="font-medium">{warrantyData.storeName}</p>
                </div>
              </div>
              
              <div className="flex justify-end pt-4">
                <button
                  onClick={() => window.print()}
                  className="bg-gray-200 text-gray-800 py-2 px-4 rounded font-medium hover:bg-gray-300 transition-colors flex items-center"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                  </svg>
                  Imprimir Certificado
                </button>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Histórico da Bateria</h3>
              
              <div className="relative">
                <div className="absolute inset-0 flex items-center" aria-hidden="true">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
              </div>
              
              <ul className="relative z-10">
                {historyData.map((event, index) => (
                  <li key={index} className="relative pl-8 py-2">
                    <div className="absolute left-0 top-2 flex h-6 w-6 items-center justify-center rounded-full bg-blue-600">
                      <div className="h-2 w-2 rounded-full bg-white"></div>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:justify-between">
                      <div>
                        <p className="font-medium text-gray-900">{event.event}</p>
                        <p className="text-sm text-gray-500">{event.location}</p>
                        <p className="text-sm text-gray-600">{event.details}</p>
                      </div>
                      <p className="text-sm text-gray-500 mt-1 sm:mt-0">{event.date}</p>
                    </div>
                    {index < historyData.length - 1 && (
                      <div className="absolute left-3 top-8 bottom-0 w-[1px] bg-gray-300"></div>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </>
        )}
      </div>
    </div>
  );
}