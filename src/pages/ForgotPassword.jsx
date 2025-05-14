// src/pages/ForgotPassword.jsx
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { requestPasswordReset } from '../services/auth';
import InputField from '../components/InputField';
import logo from '../assets/logo.svg';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email) {
      setError('Por favor, digite seu email');
      return;
    }
    
    setLoading(true);
    setError('');
    
    try {
      await requestPasswordReset(email);
      setSuccess(true);
    } catch (err) {
      setError(err.message || 'Erro ao enviar email de recuperação. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6 space-y-8">
        <div className="flex flex-col items-center">
          <img src={logo} alt="Baterias Bats Logo" className="h-20 w-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-800">Recuperar Senha</h1>
          <p className="text-gray-600 mt-1 text-center">
            Digite seu email para receber instruções de recuperação de senha
          </p>
        </div>

        {error && (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded" role="alert">
            <p>{error}</p>
          </div>
        )}

        {success ? (
          <div className="text-center">
            <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 rounded mb-6">
              <p>Email de recuperação enviado com sucesso! Verifique sua caixa de entrada.</p>
            </div>
            <Link
              to="/"
              className="inline-block bg-blue-600 text-white py-2 px-4 rounded font-medium hover:bg-blue-700 transition-colors"
            >
              Voltar para Login
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <InputField
              id="email"
              type="email"
              label="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Digite seu email"
              required
            />

            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
              >
                {loading ? 'Enviando...' : 'Enviar Email de Recuperação'}
              </button>
            </div>

            <div className="text-center">
              <Link
                to="/"
                className="text-sm text-blue-600 hover:text-blue-500 font-medium"
              >
                Voltar para Login
              </Link>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}