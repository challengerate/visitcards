import React from 'react';

const Logo: React.FC = () => (
  <div className="flex flex-col items-center justify-center">
    <img
      src="/assets/logo.png"
      alt="Logo"
      className="max-h-[200px] w-auto mx-auto"
    />
    <h1 className="mt-12 text-center">Visit Cards</h1>
  </div>
);

export default Logo;