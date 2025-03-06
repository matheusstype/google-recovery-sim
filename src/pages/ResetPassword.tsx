
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import GoogleLogo from '../components/GoogleLogo';
import RecoveryCard from '../components/RecoveryCard';
import Spinner from '../components/Spinner';
import { ArrowLeft, Eye, EyeOff } from 'lucide-react';

const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const storedEmail = localStorage.getItem('recovery_email');
    if (!storedEmail) {
      navigate('/');
      return;
    }
    
    setEmail(storedEmail);
  }, [navigate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!password) {
      setError('Digite uma nova senha');
      return;
    }
    
    if (password.length < 8) {
      setError('A senha deve ter no mínimo 8 caracteres');
      return;
    }
    
    if (password !== confirmPassword) {
      setError('As senhas não correspondem');
      return;
    }
    
    setError('');
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      navigate('/success');
    }, 1500);
  };

  const passwordStrength = () => {
    if (!password) return 0;
    
    let strength = 0;
    
    // Length check
    if (password.length >= 8) strength += 25;
    
    // Contains lowercase
    if (/[a-z]/.test(password)) strength += 25;
    
    // Contains uppercase
    if (/[A-Z]/.test(password)) strength += 25;
    
    // Contains number or special char
    if (/[\d\W]/.test(password)) strength += 25;
    
    return strength;
  };

  const getStrengthColor = () => {
    const strength = passwordStrength();
    if (strength <= 25) return 'bg-red-500';
    if (strength <= 50) return 'bg-orange-500';
    if (strength <= 75) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4 py-12">
      <div className="mb-8 animate-fade-in">
        <GoogleLogo />
      </div>
      
      <RecoveryCard>
        <button 
          className="back-button mb-4 animate-slide-right" 
          onClick={() => navigate('/verification')}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Voltar
        </button>
        
        <h1 className="text-2xl font-medium text-gray-900 mb-2 animate-slide-up">Crie uma nova senha</h1>
        <p className="text-gray-600 mb-6 animate-slide-up delay-100">
          Para a conta <strong>{email}</strong>
        </p>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4 animate-slide-up delay-200">
            <div className="relative">
              <input 
                type={showPassword ? 'text' : 'password'} 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input-field pr-10"
                placeholder="Nova senha"
                autoFocus
              />
              <button 
                type="button"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
            
            {password && (
              <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className={`h-full transition-all duration-300 ${getStrengthColor()}`} 
                  style={{ width: `${passwordStrength()}%` }}
                />
              </div>
            )}
            
            <div className="relative">
              <input 
                type={showPassword ? 'text' : 'password'} 
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="input-field pr-10"
                placeholder="Confirme a nova senha"
              />
              <button 
                type="button"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
            
            {error && <p className="text-red-500 text-sm">{error}</p>}
            
            <p className="text-sm text-gray-500">
              Use uma senha forte com no mínimo 8 caracteres, combinando letras, números e símbolos.
            </p>
          </div>
          
          <div className="flex justify-end items-center pt-4 animate-slide-up delay-300">
            <button 
              type="submit" 
              className="blue-button flex items-center justify-center min-w-[90px] h-10"
              disabled={loading}
            >
              {loading ? <Spinner /> : 'Salvar senha'}
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

export default ResetPassword;
