// src/App.jsx
import { AuthProvider } from './contexts/AuthContext';
import { BatteryProvider } from './contexts/BatteryContext';
import AppRoutes from './routes';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <BatteryProvider>
        <AppRoutes />
      </BatteryProvider>
    </AuthProvider>
  );
}

export default App;