import React from 'react';
import { Briefcase, Search, User } from 'lucide-react';

interface NavbarProps {
  onNavigate: (page: string) => void;
  currentPage: string;
}

const Navbar: React.FC<NavbarProps> = ({ onNavigate, currentPage }) => {
  return (
    <nav className="bg-white border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center cursor-pointer" onClick={() => onNavigate('home')}>
            <Briefcase className="h-8 w-8 text-indigo-600" />
            <span className="ml-2 text-xl font-bold text-slate-900">JobFinder AI</span>
          </div>
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => onNavigate('home')}
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                currentPage === 'home' ? 'text-indigo-600 bg-indigo-50' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              Find Jobs
            </button>
            <div className="h-8 w-8 rounded-full bg-slate-200 flex items-center justify-center text-slate-500">
              <User size={20} />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
