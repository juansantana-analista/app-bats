// Arquivo contexts/BatteryContext.jsx
import { createContext, useState } from 'react'

export const BatteryContext = createContext()

export const BatteryProvider = ({ children }) => {
  const [battery, setBattery] = useState(null)

  return (
    <BatteryContext.Provider value={{ battery, setBattery }}>
      {children}
    </BatteryContext.Provider>
  )
}
