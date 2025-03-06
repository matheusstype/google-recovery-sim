
import React from 'react';

const Spinner = () => {
  return (
    <div className="flex justify-center items-center">
      <div className="w-6 h-6 border-2 border-t-google-blue border-r-google-green border-b-google-yellow border-l-google-red rounded-full animate-spinner"></div>
    </div>
  );
};

export default Spinner;
