// src/components/InputField.jsx
import { useState } from 'react';

export default function InputField({
  id,
  label,
  type = 'text',
  value,
  onChange,
  placeholder,
  required = false,
  error,
}) {
  const [focused, setFocused] = useState(false);

  return (
    <div className="mb-2">
      {label && (
        <label
          htmlFor={id}
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <div className="relative">
        <input
          id={id}
          name={id}
          type={type}
          value={value}
          onChange={onChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          required={required}
          className={`
            w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 
            focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
            ${error ? 'border-red-300' : 'border-gray-300'}
            ${focused ? 'border-blue-300' : ''}
          `}
          placeholder={placeholder}
        />
        {type === 'password' && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
            {/* Ícone de olho (implementar toggle de visibilidade se necessário) */}
          </div>
        )}
      </div>
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
}