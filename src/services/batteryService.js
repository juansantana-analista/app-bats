// src/services/batteryService.js
import api from './auth';

// Function to scan a battery QR code
export const scanBatteryQRCode = async (qrCode) => {
  try {
    // This would be a real API call in a production app
    // For demo purposes, we'll simulate a response
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock response based on QR code format
    // In a real app, this would be an API call
    if (qrCode.startsWith('BAT')) {
      const status = determineStatus(qrCode);
      return {
        code: qrCode,
        model: 'Modelo ' + qrCode.substring(3, 5),
        status: status,
        manufactureDate: new Date().toISOString().split('T')[0],
        // Add more battery details as needed
      };
    } else {
      throw new Error('QR Code inválido. O código deve começar com "BAT".');
    }
  } catch (error) {
    console.error('Erro ao escanear QR code da bateria:', error);
    throw new Error(error.response?.data?.message || 'Erro ao processar QR code da bateria');
  }
};

// Helper function to determine battery status based on QR code
// In a real app, this would come from the API
const determineStatus = (qrCode) => {
  const lastDigit = parseInt(qrCode.charAt(qrCode.length - 1));
  
  if (lastDigit >= 0 && lastDigit <= 3) {
    return 'factory'; // Newly manufactured, still in factory
  } else if (lastDigit >= 4 && lastDigit <= 7) {
    return 'store'; // In store inventory
  } else {
    return 'sold'; // Sold to customer
  }
};

// Function to register a battery at the factory
export const registerBatteryAtFactory = async (batteryData) => {
  try {
    const response = await api.post('/battery/register', batteryData);
    return response.data;
  } catch (error) {
    console.error('Erro ao registrar bateria na fábrica:', error);
    throw new Error(error.response?.data?.message || 'Erro ao registrar bateria na fábrica');
  }
};

// Function to register battery arrival at store
export const registerBatteryAtStore = async (batteryData) => {
  try {
    const response = await api.post('/battery/store-entry', batteryData);
    return response.data;
  } catch (error) {
    console.error('Erro ao registrar entrada da bateria na loja:', error);
    throw new Error(error.response?.data?.message || 'Erro ao registrar entrada da bateria na loja');
  }
};

// Function to register battery sale and start warranty
export const registerBatterySale = async (saleData) => {
  try {
    const response = await api.post('/battery/sale', saleData);
    return response.data;
  } catch (error) {
    console.error('Erro ao registrar venda da bateria:', error);
    throw new Error(error.response?.data?.message || 'Erro ao registrar venda da bateria');
  }
};

// Function to check battery warranty status
export const checkBatteryWarranty = async (batteryCode) => {
  try {
    const response = await api.get(`/battery/warranty/${batteryCode}`);
    return response.data;
  } catch (error) {
    console.error('Erro ao verificar garantia da bateria:', error);
    throw new Error(error.response?.data?.message || 'Erro ao verificar garantia da bateria');
  }
};

// Function to get battery history
export const getBatteryHistory = async (batteryCode) => {
  try {
    const response = await api.get(`/battery/history/${batteryCode}`);
    return response.data;
  } catch (error) {
    console.error('Erro ao obter histórico da bateria:', error);
    throw new Error(error.response?.data?.message || 'Erro ao obter histórico da bateria');
  }
};