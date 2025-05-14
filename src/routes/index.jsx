// src/routes/index.jsx
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Login from '../pages/Login';
import Home from '../pages/Home';
import FactoryRegister from '../pages/FactoryRegister';
import StoreEntry from '../pages/StoreEntry';
import SaleRegister from '../pages/SaleRegister';
import WarrantyCheck from '../pages/WarrantyCheck';
import ForgotPassword from '../pages/ForgotPassword';
import ScanQRCode from '../pages/ScanQRCode';

// Protected route component
const PrivateRoute = ({ children }) => {
  const { authenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return authenticated ? children : <Navigate to="/" />;
};

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        
        {/* Protected routes */}
        <Route
          path="/home"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />
        <Route
          path="/factory"
          element={
            <PrivateRoute>
              <FactoryRegister />
            </PrivateRoute>
          }
        />
        <Route
          path="/store"
          element={
            <PrivateRoute>
              <StoreEntry />
            </PrivateRoute>
          }
        />
        <Route
          path="/venda"
          element={
            <PrivateRoute>
              <SaleRegister />
            </PrivateRoute>
          }
        />
        <Route
          path="/warranty"
          element={
            <PrivateRoute>
              <WarrantyCheck />
            </PrivateRoute>
          }
        />
        <Route
          path="/scan"
          element={
            <PrivateRoute>
              <ScanQRCode />
            </PrivateRoute>
          }
        />
        
        {/* Fallback route for any unmatched path */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}