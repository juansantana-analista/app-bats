// src/hooks/useScanQR.js
import { useState } from 'react';

export default function useScanQR() {
  const [scanning, setScanning] = useState(false);
  const [error, setError] = useState('');
  const [scannedData, setScannedData] = useState(null);

  // In a real app, you would implement actual QR code scanning here
  // Using a library like react-qr-reader
  const startScanning = () => {
    setScanning(true);
    setError('');
    
    // Simulating a QR code scan after 2 seconds
    setTimeout(() => {
      try {
        // Generate a random battery code for demonstration
        const mockQRCodeData = "BAT" + Math.floor(Math.random() * 10000000);
        
        setScannedData(mockQRCodeData);
        setScanning(false);
      } catch (error) {
        setError('Erro ao escanear QR code. Tente novamente.');
        setScanning(false);
      }
    }, 2000);
  };

  const resetScan = () => {
    setScanning(false);
    setError('');
    setScannedData(null);
  };

  return {
    scanning,
    error,
    scannedData,
    startScanning,
    resetScan
  };
}