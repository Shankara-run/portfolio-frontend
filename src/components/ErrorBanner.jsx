import React from 'react';

const ErrorBanner = ({ error, showHidden }) => {
  if (!error) return null;

  return (
    <div className={`mx-4 mt-4 p-3 rounded-lg border 
      ${showHidden 
        ? 'bg-red-900/50 border-red-500/50 text-red-200' 
        : 'bg-red-50 border-red-200 text-red-700'
      }`}>
      <div className="flex items-center space-x-2">
        <div className={`w-4 h-4 rounded-full flex-shrink-0 bg-red-500 
          ${showHidden ? 'text-white' : 'text-red-700'}`}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
            <path d="M18 10a8 8 0 11-16 0 8 8 0 0 16 0zM7 8a2 2 0 114 0 2 2 0 0 1-4zm10 0a2 2 0 114 0 2 2 0 0 1-4zm-7 2a2 2 0 114 0 2 2 0 0 1-4zm14 0a2 2 0 114 0 2 2 0 0 1-4z" />
          </svg>
        </div>
        <span className="text-sm">{error}</span>
      </div>
    </div>
  );
};

export default ErrorBanner;
