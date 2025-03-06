
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import GoogleLogo from '../components/GoogleLogo';
import RecoveryCard from '../components/RecoveryCard';
import Spinner from '../components/Spinner';
import RecoveryProcess from '../components/RecoveryProcess';
import { ShieldCheck, Zap, Phone, HelpCircle } from 'lucide-react';
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
    navigate('/success');
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-50 px-4 py-12">
      <div className="mb-8 animate-fade-in">
        <GoogleLogo />
      </div>
      
      {!showRecoveryProcess ? (
        <div className="w-full max-w-4xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="bg-white p-6 rounded-lg shadow-md animate-fade-in delay-100">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                  <Zap className="w-6 h-6 text-google-blue" />
                </div>
                <h3 className="text-lg font-medium">Recuperação Rápida</h3>
              </div>
              <p className="text-gray-600">Recupere seu acesso ao e-mail em poucos minutos com nosso processo simplificado e eficiente.</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md animate-fade-in delay-200">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-4">
                  <ShieldCheck className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="text-lg font-medium">Totalmente Seguro</h3>
              </div>
              <p className="text-gray-600">Seus dados estão protegidos com a mais alta tecnologia de criptografia e segurança disponível.</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md animate-fade-in delay-300">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center mr-4">
                  <Phone className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="text-lg font-medium">Suporte Exclusivo</h3>
              </div>
              <p className="text-gray-600">Equipe especializada disponível para auxiliar em todas as etapas do processo de recuperação.</p>
            </div>
          </div>
          
          <RecoveryCard>
            <h1 className="text-2xl font-medium text-gray-900 mb-2 animate-slide-up">Recuperar sua conta de e-mail</h1>
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
          </RecoveryCard>
          
          <div className="mt-12 bg-white p-6 rounded-lg shadow-md animate-fade-in">
            <h2 className="text-xl font-medium mb-6 flex items-center">
              <HelpCircle className="w-6 h-6 mr-2 text-google-blue" />
              Perguntas Frequentes
            </h2>
            
            <div className="space-y-4">
              <div className="border-b pb-4">
                <h3 className="font-medium mb-2">Quanto tempo leva para recuperar minha conta?</h3>
                <p className="text-gray-600">O processo de recuperação é rápido e geralmente leva apenas alguns minutos para ser concluído.</p>
              </div>
              
              <div className="border-b pb-4">
                <h3 className="font-medium mb-2">É seguro fornecer meu e-mail neste site?</h3>
                <p className="text-gray-600">Sim, utilizamos tecnologia de criptografia avançada para proteger todos os dados fornecidos em nosso sistema.</p>
              </div>
              
              <div className="border-b pb-4">
                <h3 className="font-medium mb-2">Preciso pagar para recuperar minha conta?</h3>
                <p className="text-gray-600">Sim, existe uma pequena taxa para cobrir os custos operacionais do processo de recuperação segura.</p>
              </div>
              
              <div>
                <h3 className="font-medium mb-2">E se eu não conseguir recuperar minha conta?</h3>
                <p className="text-gray-600">Nossa equipe de suporte está disponível para ajudar em casos especiais. Entre em contato conosco para assistência adicional.</p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <RecoveryCard>
          <div className="py-4">
            <h1 className="text-2xl font-medium text-gray-900 mb-2 animate-slide-up">Recuperando sua conta</h1>
            <p className="text-gray-600 mb-8 animate-slide-up delay-100">
              Por favor, aguarde enquanto processamos sua solicitação
            </p>
            <RecoveryProcess onComplete={handleRecoveryComplete} />
          </div>
        </RecoveryCard>
      )}
      
      <div className="mt-8 w-full max-w-4xl">
        <div className="flex flex-col items-center justify-center text-sm text-gray-500 space-y-4 animate-fade-in border-t pt-8">
          <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-8">
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
          <p className="text-sm text-gray-400">CNPJ: 05.032.035/0001-26</p>
        </div>
      </div>
    </div>
  );
};

export default Index;
