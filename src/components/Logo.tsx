import React from 'react';
import { Keyboard } from 'lucide-react';

export default function Logo() {
  return (
    <div className="flex items-center gap-2">
      <div className="relative w-6 h-6 sm:w-8 sm:h-8">
        <Keyboard className="w-full h-full text-white" />
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 to-purple-600 opacity-50 blur-lg -z-10" />
      </div>
      <div>
        <h1 className="text-lg sm:text-xl font-bold bg-gradient-to-r from-indigo-300 to-purple-300 text-transparent bg-clip-text">
          TypeMaster
        </h1>
      </div>
    </div>
  );
}