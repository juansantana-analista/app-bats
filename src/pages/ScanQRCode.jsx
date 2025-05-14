// src/pages/ScanQRCode.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';

export default function ScanQRCode() {
  const [scanning, setScanning] = useState(false);
  const [scannedData, setScannedData] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Simulating a camera scan for QR code
  // In a real application, you would integrate a QR code scanner library here
  // such as react-qr-reader or zxing
  const startScanning = () => {
    setScanning(true);
    setError('');
    
    // Simulating a successful scan after 2 seconds
    setTimeout(() => {
      const mockQRCodeData = "BAT" + Math.floor(Math.random() * 10000000);
      setScanning(false);
      handleScannedCode(mockQRCodeData);
    }, 2000);
  };

  const handleScannedCode = async (qrCodeData) => {
    try {
      setLoading(true);
      // In a real app, this would be an API call to get battery data
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API delay
      
      // Mock battery data based on QR code
      const mockBatteryData = getMockBatteryData(qrCodeData);
      setScannedData(mockBatteryData);
      setLoading(false);
    } catch (err) {
      setError(err.message || 'Erro ao processar o QR code. Tente novamente.');
      setLoading(false);
    }
  };
  
  // For demo purposes - generate mock battery data
  const getMockBatteryData = (code) => {
    // Determine status based on last digit of QR code
    const lastDigit = parseInt(code.charAt(code.length - 1));
    let status;
    
    if (lastDigit >= 0 && lastDigit <= 3) {
      status = 'factory'; // Newly manufactured, still in factory
    } else if (lastDigit >= 4 && lastDigit <= 7) {
      status = 'store'; // In store inventory
    } else {
      status = 'sold'; // Sold to customer
    }
    
    return {
      code: code,
      model: "Premium " + code.substring(3, 5),
      status: status,
      manufactureDate: new Date().toISOString().split('T')[0]
    };
  };

  const navigateByBatteryStatus = () => {
    if (!scannedData) return;
    
    // Navigate based on the battery's current status
    if (scannedData.status === 'factory') {
      navigate('/store', { state: { batteryData: scannedData } });
    } else if (scannedData.status === 'store') {
      navigate('/venda', { state: { batteryData: scannedData } });
    } else if (scannedData.status === 'sold') {
      navigate('/warranty', { state: { batteryData: scannedData } });
    } else {
      // Default to factory register if status is unknown
      navigate('/factory');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-semibold text-gray-900 mb-6">Escanear QR Code</h1>
        
        <div className="bg-white rounded-lg shadow p-6">
          {!scannedData ? (
            <>
              <div className={`border-2 border-dashed border-gray-300 rounded-lg h-64 mb-6 flex items-center justify-center ${scanning ? 'bg-blue-50' : ''}`}>
                {scanning ? (
                  <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto mb-3"></div>
                    <p className="text-gray-600">Escaneando QR Code...</p>
                  </div>
                ) : (
                  <div className="text-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-400 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
                    </svg>
                    <p className="text-gray-600 mb-2">Posicione o QR code da bateria em frente à câmera</p>
                  </div>
                )}
              </div>
              
              {error && (
                <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded mb-6" role="alert">
                  <p>{error}</p>
                </div>
              )}
              
              <button
                onClick={startScanning}
                disabled={scanning || loading}
                className="w-full bg-blue-600 text-white py-3 rounded-md font-medium hover:bg-blue-700 transition-colors flex items-center justify-center disabled:opacity-50"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {scanning ? 'Escaneando...' : 'Iniciar Escaneamento'}
              </button>
            </>
          ) : (
            <div className="text-center">
              <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 rounded mb-6">
                <p>QR Code escaneado com sucesso!</p>
              </div>
              
              <div className="bg-white border border-gray-200 rounded-lg p-4 mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Informações da Bateria</h3>
                <div className="space-y-2 text-left">
                  <p><span className="font-medium">Código:</span> {scannedData.code}</p>
                  <p><span className="font-medium">Modelo:</span> {scannedData.model || 'N/A'}</p>
                  <p><span className="font-medium">Status:</span> {
                    scannedData.status === 'factory' ? 'Fábrica' : 
                    scannedData.status === 'store' ? 'Em Loja' : 
                    scannedData.status === 'sold' ? 'Vendida' : 'Desconhecido'
                  }</p>
                  <p><span className="font-medium">Data de Fabricação:</span> {scannedData.manufactureDate || 'N/A'}</p>
                </div>
              </div>
              
              <div className="flex flex-col space-y-3">
                <button
                  onClick={navigateByBatteryStatus}
                  className="w-full bg-blue-600 text-white py-3 rounded-md font-medium hover:bg-blue-700 transition-colors"
                >
                  Continuar para o Próximo Passo
                </button>
                
                <button
                  onClick={() => {
                    setScannedData(null);
                    setError('');
                  }}
                  className="w-full bg-gray-200 text-gray-800 py-3 rounded-md font-medium hover:bg-gray-300 transition-colors"
                >
                  Escanear Outro QR Code
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}