// src/pages/SaleRegister.jsx
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Header from '../components/Header';
import InputField from '../components/InputField';
import { registerBatterySale } from '../services/batteryService';

export default function SaleRegister() {
  const navigate = useNavigate();
  const location = useLocation();
  
  const [saleData, setSaleData] = useState({
    batteryCode: '',
    saleDate: new Date().toISOString().split('T')[0],
    customerName: '',
    customerPhone: '',
    customerEmail: '',
    customerDocument: '',
    vehicleModel: '',
    vehiclePlate: '',
    warrantyPeriod: '12',
    salePrice: '',
    comments: ''
  });
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  // If battery data is passed through navigation
  useEffect(() => {
    if (location.state?.batteryData) {
      setSaleData(prevData => ({
        ...prevData,
        batteryCode: location.state.batteryData.code || '',
        batteryModel: location.state.batteryData.model || ''
      }));
    }
  }, [location]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSaleData({
      ...saleData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!saleData.batteryCode || !saleData.customerName || !saleData.customerPhone) {
      setError('Por favor, preencha todos os campos obrigatórios');
      return;
    }
    
    setLoading(true);
    setError('');
    
    try {
      await registerBatterySale(saleData);
      setSuccess(true);
      setTimeout(() => {
        navigate('/home');
      }, 2000);
    } catch (err) {
      setError(err.message || 'Erro ao registrar venda. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-semibold text-gray-900 mb-6">Registro de Venda e Garantia</h1>
        
        <div className="bg-white rounded-lg shadow p-6">
          {success ? (
            <div className="text-center">
              <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 rounded mb-6">
                <p>Venda registrada e garantia iniciada com sucesso!</p>
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
              
              <div className="bg-yellow-50 p-4 rounded border border-yellow-100 mb-4">
                <h3 className="text-yellow-800 font-medium mb-2">Informação de Garantia</h3>
                <p className="text-yellow-700 text-sm">
                  Ao registrar a venda, você está iniciando o período de garantia para esta bateria.
                  Certifique-se de preencher todos os dados corretamente.
                </p>
              </div>
              
              <h3 className="text-lg font-medium text-gray-900 border-b pb-2 mb-2">Dados da Bateria</h3>
              
              <InputField
                id="batteryCode"
                name="batteryCode"
                label="Código da Bateria"
                value={saleData.batteryCode}
                onChange={handleChange}
                placeholder="Digite o código da bateria"
                required
                disabled={!!location.state?.batteryData}
              />
              
              {saleData.batteryModel && (
                <div className="bg-blue-50 p-3 rounded border border-blue-100">
                  <p className="text-blue-800"><span className="font-medium">Modelo:</span> {saleData.batteryModel}</p>
                </div>
              )}
              
              <InputField
                id="saleDate"
                name="saleDate"
                type="date"
                label="Data da Venda"
                value={saleData.saleDate}
                onChange={handleChange}
                required
              />
              
              <div className="mb-4">
                <label htmlFor="warrantyPeriod" className="block text-sm font-medium text-gray-700 mb-1">
                  Período de Garantia (meses)
                </label>
                <select
                  id="warrantyPeriod"
                  name="warrantyPeriod"
                  value={saleData.warrantyPeriod}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="12">12 meses</option>
                  <option value="18">18 meses</option>
                  <option value="24">24 meses</option>
                  <option value="36">36 meses</option>
                </select>
              </div>
              
              <InputField
                id="salePrice"
                name="salePrice"
                label="Preço de Venda (R$)"
                value={saleData.salePrice}
                onChange={handleChange}
                placeholder="0,00"
              />
              
              <h3 className="text-lg font-medium text-gray-900 border-b pb-2 mb-2 pt-2">Dados do Cliente</h3>
              
              <InputField
                id="customerName"
                name="customerName"
                label="Nome do Cliente"
                value={saleData.customerName}
                onChange={handleChange}
                placeholder="Nome completo"
                required
              />
              
              <InputField
                id="customerPhone"
                name="customerPhone"
                label="Telefone"
                value={saleData.customerPhone}
                onChange={handleChange}
                placeholder="(00) 00000-0000"
                required
              />
              
              <InputField
                id="customerEmail"
                name="customerEmail"
                type="email"
                label="Email"
                value={saleData.customerEmail}
                onChange={handleChange}
                placeholder="email@exemplo.com"
              />
              
              <InputField
                id="customerDocument"
                name="customerDocument"
                label="CPF/CNPJ"
                value={saleData.customerDocument}
                onChange={handleChange}
                placeholder="000.000.000-00"
              />
              
              <h3 className="text-lg font-medium text-gray-900 border-b pb-2 mb-2 pt-2">Dados do Veículo</h3>
              
              <InputField
                id="vehicleModel"
                name="vehicleModel"
                label="Modelo do Veículo"
                value={saleData.vehicleModel}
                onChange={handleChange}
                placeholder="Marca e modelo"
              />
              
              <InputField
                id="vehiclePlate"
                name="vehiclePlate"
                label="Placa"
                value={saleData.vehiclePlate}
                onChange={handleChange}
                placeholder="AAA-0000"
              />
              
              <div className="mb-4">
                <label htmlFor="comments" className="block text-sm font-medium text-gray-700 mb-1">
                  Observações
                </label>
                <textarea
                  id="comments"
                  name="comments"
                  rows="3"
                  value={saleData.comments}
                  onChange={handleChange}
                  placeholder="Observações adicionais sobre a venda"
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
                  {loading ? 'Registrando...' : 'Registrar Venda e Iniciar Garantia'}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}