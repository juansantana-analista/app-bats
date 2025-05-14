// src/pages/StoreEntry.jsx
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Header from '../components/Header';
import InputField from '../components/InputField';
import { registerBatteryAtStore } from '../services/batteryService';

export default function StoreEntry() {
  const navigate = useNavigate();
  const location = useLocation();
  
  const [batteryData, setBatteryData] = useState({
    code: '',
    receiptDate: new Date().toISOString().split('T')[0],
    storeId: '',
    receivedBy: '',
    condition: 'good',
    comments: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  // If battery data is passed through navigation
  useEffect(() => {
    if (location.state?.batteryData) {
      setBatteryData(prevData => ({
        ...prevData,
        code: location.state.batteryData.code || '',
        model: location.state.batteryData.model || ''
      }));
    }
  }, [location]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBatteryData({
      ...batteryData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!batteryData.code || !batteryData.storeId || !batteryData.receivedBy) {
      setError('Por favor, preencha todos os campos obrigatórios');
      return;
    }
    
    setLoading(true);
    setError('');
    
    try {
      await registerBatteryAtStore(batteryData);
      setSuccess(true);
      setTimeout(() => {
        navigate('/home');
      }, 2000);
    } catch (err) {
      setError(err.message || 'Erro ao registrar entrada na loja. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-semibold text-gray-900 mb-6">Entrada de Bateria na Loja</h1>
        
        <div className="bg-white rounded-lg shadow p-6">
          {success ? (
            <div className="text-center">
              <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 rounded mb-6">
                <p>Entrada na loja registrada com sucesso!</p>
              </div>
              <p className="mb-4">Redirecionando para a página inicial...</p>
              <button
                onClick={() => navigate('/home')}
                className="bg-blue-600 text-white py-2 px-4 rounded font-medium hover:bg-blue-700 transition-colors"
              >
                Voltar para o Início
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded" role="alert">
                  <p>{error}</p>
                </div>
              )}
              
              <InputField
                id="code"
                name="code"
                label="Código da Bateria"
                value={batteryData.code}
                onChange={handleChange}
                placeholder="Digite o código da bateria"
                required
                disabled={!!location.state?.batteryData}
              />
              
              {batteryData.model && (
                <div className="bg-blue-50 p-3 rounded border border-blue-100 mb-4">
                  <p className="text-blue-800"><span className="font-medium">Modelo:</span> {batteryData.model}</p>
                </div>
              )}
              
              <InputField
                id="receiptDate"
                name="receiptDate"
                type="date"
                label="Data de Recebimento"
                value={batteryData.receiptDate}
                onChange={handleChange}
                required
              />
              
              <InputField
                id="storeId"
                name="storeId"
                label="ID da Loja"
                value={batteryData.storeId}
                onChange={handleChange}
                placeholder="Digite o ID da loja"
                required
              />
              
              <InputField
                id="receivedBy"
                name="receivedBy"
                label="Recebido por"
                value={batteryData.receivedBy}
                onChange={handleChange}
                placeholder="Nome de quem recebeu"
                required
              />
              
              <div className="mb-4">
                <label htmlFor="condition" className="block text-sm font-medium text-gray-700 mb-1">
                  Condição
                </label>
                <select
                  id="condition"
                  name="condition"
                  value={batteryData.condition}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="good">Boa</option>
                  <option value="damaged">Danificada</option>
                  <option value="refurbished">Recondicionada</option>
                </select>
              </div>
              
              <div className="mb-4">
                <label htmlFor="comments" className="block text-sm font-medium text-gray-700 mb-1">
                  Observações
                </label>
                <textarea
                  id="comments"
                  name="comments"
                  rows="3"
                  value={batteryData.comments}
                  onChange={handleChange}
                  placeholder="Observações adicionais"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                ></textarea>
              </div>
              
              <div className="flex justify-end pt-4">
                <button
                  type="button"
                  onClick={() => navigate('/home')}
                  className="bg-gray-200 text-gray-800 py-2 px-4 rounded font-medium hover:bg-gray-300 transition-colors mr-4"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-blue-600 text-white py-2 px-4 rounded font-medium hover:bg-blue-700 transition-colors disabled:opacity-50"
                >
                  {loading ? 'Registrando...' : 'Confirmar Entrada'}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}