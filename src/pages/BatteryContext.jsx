// src/contexts/BatteryContext.jsx
import { createContext, useState, useContext } from 'react';

export const BatteryContext = createContext();

export const useBattery = () => {
  const context = useContext(BatteryContext);
  if (!context) {
    throw new Error('useBattery must be used within a BatteryProvider');
  }
  return context;
};

export const BatteryProvider = ({ children }) => {
  const [battery, setBattery] = useState(null);
  const [batteryHistory, setBatteryHistory] = useState([]);

  const updateBattery = (newBatteryData) => {
    setBattery(newBatteryData);
  };

  const clearBattery = () => {
    setBattery(null);
    setBatteryHistory([]);
  };

  const updateBatteryHistory = (newHistoryData) => {
    setBatteryHistory(newHistoryData);
  };

  return (
    <BatteryContext.Provider 
      value={{ 
        battery, 
        setBattery: updateBattery, 
        clearBattery,
        batteryHistory,
        setBatteryHistory: updateBatteryHistory
      }}
    >
      {children}
    </BatteryContext.Provider>
  );
};