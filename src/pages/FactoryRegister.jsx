// src/pages/FactoryRegister.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import InputField from '../components/InputField';
import { registerBatteryAtFactory } from '../services/batteryService';

export default function FactoryRegister() {
  const [batteryData, setBatteryData] = useState({
    code: '',
    model: '',
    manufactureDate: new Date().toISOString().split('T')[0],
    batch: '',
    comments: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBatteryData({
      ...batteryData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!batteryData.code || !batteryData.model) {
      setError('Por favor, preencha todos os campos obrigatórios');
      return;
    }
    
    setLoading(true);
    setError('');
    
    try {
      await registerBatteryAtFactory(batteryData);
      setSuccess(true);
      setTimeout(() => {
        navigate('/home');
      }, 2000);
    } catch (err) {
      setError(err.message || 'Erro ao registrar bateria. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const generateRandomCode = () => {
    const randomCode = 'BAT' + Math.floor(Math.random() * 10000000);
    setBatteryData({
      ...batteryData,
      code: randomCode
    });
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-semibold text-gray-900 mb-6">Cadastro de Bateria na Fábrica</h1>
        
        <div className="bg-white rounded-lg shadow p-6">
          {success ? (
            <div className="text-center">
              <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 rounded mb-6">
                <p>Bateria registrada com sucesso!</p>
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
              
              <div className="flex flex-col md:flex-row md:items-end md:space-x-4">
                <div className="flex-grow mb-4 md:mb-0">
                  <InputField
                    id="code"
                    name="code"
                    label="Código da Bateria"
                    value={batteryData.code}
                    onChange={handleChange}
                    placeholder="Digite ou gere um código"
                    required
                  />
                </div>
                <button
                  type="button"
                  onClick={generateRandomCode}
                  className="bg-gray-200 text-gray-800 py-2 px-4 rounded font-medium hover:bg-gray-300 transition-colors"
                >
                  Gerar Código
                </button>
              </div>
              
              <InputField
                id="model"
                name="model"
                label="Modelo"
                value={batteryData.model}
                onChange={handleChange}
                placeholder="Digite o modelo da bateria"
                required
              />
              
              <InputField
                id="manufactureDate"
                name="manufactureDate"
                type="date"
                label="Data de Fabricação"
                value={batteryData.manufactureDate}
                onChange={handleChange}
                required
              />
              
              <InputField
                id="batch"
                name="batch"
                label="Lote"
                value={batteryData.batch}
                onChange={handleChange}
                placeholder="Digite o número do lote"
              />
              
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
                  placeholder="Observações adicionais sobre a bateria"
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
                  {loading ? 'Registrando...' : 'Registrar Bateria'}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}