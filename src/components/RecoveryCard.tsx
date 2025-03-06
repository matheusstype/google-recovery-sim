
import React, { ReactNode } from 'react';

interface RecoveryCardProps {
  children: ReactNode;
}

const RecoveryCard = ({ children }: RecoveryCardProps) => {
  return (
    <div className="recovery-card">
      <div className="p-8">{children}</div>
    </div>
  );
};

export default RecoveryCard;
