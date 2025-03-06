
import React, { useEffect, useState } from 'react';
import { CheckCircle, Circle, Loader } from 'lucide-react';
import { Progress } from "@/components/ui/progress";

interface Step {
  label: string;
  duration: number;
  status: 'pending' | 'processing' | 'completed';
}

const RecoveryProcess = ({ onComplete }: { onComplete: () => void }) => {
  const [progress, setProgress] = useState(0);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  
  const steps: Step[] = [
    { label: 'Verificando endereço de e-mail', duration: 4000, status: 'pending' },
    { label: 'Buscando informações da conta', duration: 6000, status: 'pending' },
    { label: 'Verificando histórico de segurança', duration: 5000, status: 'pending' },
    { label: 'Preparando código de recuperação', duration: 5000, status: 'pending' },
    { label: 'Enviando código para seu e-mail', duration: 5000, status: 'pending' },
  ];

  useEffect(() => {
    const totalDuration = steps.reduce((acc, step) => acc + step.duration, 0);
    const incrementInterval = 50; // Update every 50ms
    const progressPerIncrement = 100 / (totalDuration / incrementInterval);
    
    let currentProgress = 0;
    let currentTime = 0;
    let stepStartTime = 0;
    let currentStep = 0;
    
    // Mark first step as processing
    steps[0].status = 'processing';
    
    const interval = setInterval(() => {
      currentTime += incrementInterval;
      currentProgress += progressPerIncrement;
      setProgress(Math.min(currentProgress, 100));
      
      // Check if we need to move to next step
      const elapsedInCurrentStep = currentTime - stepStartTime;
      if (elapsedInCurrentStep >= steps[currentStep].duration) {
        // Complete current step
        steps[currentStep].status = 'completed';
        
        // Move to next step
        stepStartTime = currentTime;
        currentStep++;
        
        if (currentStep < steps.length) {
          // Start next step
          steps[currentStep].status = 'processing';
          setCurrentStepIndex(currentStep);
        }
      }
      
      // Update step statuses in state
      setCurrentStepIndex(prevIndex => {
        // This forces a re-render to show updated statuses
        return currentStep;
      });
      
      // If we've reached 100%, complete the process
      if (currentProgress >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          onComplete();
        }, 500);
      }
    }, incrementInterval);
    
    return () => clearInterval(interval);
  }, [onComplete]);
  
  return (
    <div className="flex flex-col space-y-6 w-full animate-fade-in">
      <Progress value={progress} className="w-full h-2" />
      
      <div className="text-right text-sm text-gray-500">
        {Math.round(progress)}% concluído
      </div>
      
      <div className="space-y-4">
        {steps.map((step, index) => (
          <div key={index} className="flex items-center space-x-3">
            {step.status === 'completed' ? (
              <CheckCircle className="h-5 w-5 text-google-green" />
            ) : step.status === 'processing' ? (
              <Loader className="h-5 w-5 text-google-blue animate-spin" />
            ) : (
              <Circle className="h-5 w-5 text-gray-300" />
            )}
            <span className={`${step.status === 'completed' ? 'text-gray-500' : 
                               step.status === 'processing' ? 'text-google-blue font-medium' : 
                               'text-gray-400'}`}>
              {step.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecoveryProcess;
