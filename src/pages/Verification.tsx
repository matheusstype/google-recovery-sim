
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import GoogleLogo from '../components/GoogleLogo';
import RecoveryCard from '../components/RecoveryCard';
import Spinner from '../components/Spinner';
import { ArrowLeft } from 'lucide-react';

const Verification = () => {
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [email, setEmail] = useState('');
  const [countdown, setCountdown] = useState(60);
  const navigate = useNavigate();

  useEffect(() => {
    const storedEmail = localStorage.getItem('recovery_email');
    if (!storedEmail) {
      navigate('/');
      return;
    }
    
    setEmail(storedEmail);
    
    const timer = setInterval(() => {
      setCountdown((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    
    return () => clearInterval(timer);
  }, [navigate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!code || code.length < 6) {
      setError('Digite um código de verificação válido');
      return;
    }
    
    setError('');
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      navigate('/reset-password');
    }, 1500);
  };

  const handleResendCode = () => {
    setCountdown(60);
    // Show notification
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4 py-12">
      <div className="mb-8 animate-fade-in">
        <GoogleLogo />
      </div>
      
      <RecoveryCard>
        <button 
          className="back-button mb-4 animate-slide-right" 
          onClick={() => navigate('/')}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Voltar
        </button>
        
        <h1 className="text-2xl font-medium text-gray-900 mb-2 animate-slide-up">Verifique seu e-mail</h1>
        <p className="text-gray-600 mb-6 animate-slide-up delay-100">
          Enviamos um código de verificação para <strong>{email}</strong>
        </p>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="animate-slide-up delay-200">
            <input 
              type="text" 
              value={code}
              onChange={(e) => setCode(e.target.value.replace(/[^0-9]/g, '').substring(0, 6))}
              className="input-field"
              placeholder="Digite o código de 6 dígitos"
              autoFocus
              maxLength={6}
            />
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
            
            <div className="flex items-center justify-between mt-4 text-sm">
              <button 
                type="button"
                disabled={countdown > 0}
                onClick={handleResendCode}
                className={`${countdown > 0 ? 'text-gray-400' : 'text-google-blue hover:text-blue-700'} transition-colors`}
              >
                Reenviar código {countdown > 0 && `(${countdown}s)`}
              </button>
              
              <button
                type="button"
                onClick={() => navigate('/reset-password')} 
                className="text-google-blue hover:text-blue-700 transition-colors"
              >
                Tentar outra forma
              </button>
            </div>
          </div>
          
          <div className="flex justify-end items-center pt-4 animate-slide-up delay-300">
            <button 
              type="submit" 
              className="blue-button flex items-center justify-center min-w-[90px] h-10"
              disabled={loading}
            >
              {loading ? <Spinner /> : 'Verificar'}
            </button>
          </div>
        </form>
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

export default Verification;
