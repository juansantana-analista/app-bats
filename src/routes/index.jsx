// Arquivo routes/index.jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import FactoryRegister from '../pages/FactoryRegister'
import SaleRegister from '../pages/SaleRegister'

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<FactoryRegister />} />
        <Route path="/venda" element={<SaleRegister />} />
      </Routes>
    </BrowserRouter>
  )
}
