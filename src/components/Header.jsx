// src/components/Header.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { logout } from '../services/auth';

export default function Header({ userName }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error("Erro ao realizar logout:", error);
    }
  };

  return (
    <nav className="bg-blue-600 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <span className="text-white text-xl font-bold">BATS</span>
            </div>
          </div>
          
          <div className="flex items-center">
            <div className="hidden md:ml-4 md:flex-shrink-0 md:flex md:items-center">
              <div className="ml-3 relative">
                <div>
                  <button
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-blue-600 focus:ring-white"
                    id="user-menu"
                    aria-expanded="false"
                    aria-haspopup="true"
                  >
                    <span className="sr-only">Abrir menu do usuário</span>
                    <div className="h-8 w-8 rounded-full bg-white flex items-center justify-center text-blue-600 font-bold">
                      {userName ? userName.charAt(0).toUpperCase() : 'U'}
                    </div>
                  </button>
                </div>
                
                {isMenuOpen && (
                  <div
                    className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="user-menu"
                  >
                    <div className="block px-4 py-2 text-sm text-gray-700 border-b">
                      <p className="font-medium">{userName || 'Usuário'}</p>
                    </div>
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      role="menuitem"
                    >
                      Perfil
                    </a>
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      role="menuitem"
                    >
                      Configurações
                    </a>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      role="menuitem"
                    >
                      Sair
                    </button>
                  </div>
                )}
              </div>
            </div>
            
            <div className="-mr-2 flex md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="bg-blue-600 inline-flex items-center justify-center p-2 rounded-md text-white hover:text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-blue-800 focus:ring-white"
              >
                <span className="sr-only">Abrir menu principal</span>
                <svg
                  className="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  {isMenuOpen ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Menu mobile */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="pt-4 pb-3 border-t border-blue-700">
            <div className="flex items-center px-5">
              <div className="flex-shrink-0">
                <div className="h-10 w-10 rounded-full bg-white flex items-center justify-center text-blue-600 font-bold">
                  {userName ? userName.charAt(0).toUpperCase() : 'U'}
                </div>
              </div>
              <div className="ml-3">
                <div className="text-base font-medium leading-none text-white">
                  {userName || 'Usuário'}
                </div>
              </div>
            </div>
            <div className="mt-3 px-2 space-y-1">
              <a
                href="#"
                className="block px-3 py-2 rounded-md text-base font-medium text-white hover:text-white hover:bg-blue-700"
              >
                Perfil
              </a>
              <a
                href="#"
                className="block px-3 py-2 rounded-md text-base font-medium text-white hover:text-white hover:bg-blue-700"
              >
                Configurações
              </a>
              <button
                onClick={handleLogout}
                className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-white hover:text-white hover:bg-blue-700"
              >
                Sair
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}