import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

interface CustomerLayoutProps {
  children: React.ReactNode;
  onLogout: () => void;
  title?: string;
}

const CustomerLayout: React.FC<CustomerLayoutProps> = ({ children, onLogout, title }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans flex">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r border-gray-200 flex flex-col fixed inset-y-0 left-0 shadow-sm z-10">
        <div className="p-6 border-b border-gray-100">
            <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight cursor-pointer" onClick={() => navigate('/dashboard')}>PMBank</h1>
            <p className="text-xs text-gray-400 mt-1">Personal Banking</p>
        </div>
        <nav className="p-4 space-y-2 flex-1">
            <div 
                onClick={() => navigate('/dashboard')}
                className={`px-4 py-3 rounded-xl font-medium cursor-pointer transition-colors flex items-center gap-3 ${isActive('/dashboard') ? 'bg-blue-50 text-blue-600' : 'text-gray-500 hover:bg-gray-50'}`}
            >
                <span>🏠</span> Dashboard
            </div>
            <div 
                onClick={() => navigate('/card-details')}
                className={`px-4 py-3 rounded-xl font-medium cursor-pointer transition-colors flex items-center gap-3 ${isActive('/card-details') ? 'bg-blue-50 text-blue-600' : 'text-gray-500 hover:bg-gray-50'}`}
            >
                <span>💳</span> My Card
            </div>
            <div 
                onClick={() => navigate('/transactions')}
                className={`px-4 py-3 rounded-xl font-medium cursor-pointer transition-colors flex items-center gap-3 ${isActive('/transactions') ? 'bg-blue-50 text-blue-600' : 'text-gray-500 hover:bg-gray-50'}`}
            >
                <span>📊</span> Transactions
            </div>
            <div 
                onClick={() => navigate('/rewards')}
                className={`px-4 py-3 rounded-xl font-medium cursor-pointer transition-colors flex items-center gap-3 ${isActive('/rewards') ? 'bg-blue-50 text-blue-600' : 'text-gray-500 hover:bg-gray-50'}`}
            >
                <span>🎁</span> Rewards
            </div>
            <div 
                onClick={() => navigate('/settings')}
                className={`px-4 py-3 rounded-xl font-medium cursor-pointer transition-colors flex items-center gap-3 ${isActive('/settings') ? 'bg-blue-50 text-blue-600' : 'text-gray-500 hover:bg-gray-50'}`}
            >
                <span>⚙️</span> Settings
            </div>
        </nav>
        <div className="p-4 border-t border-gray-100">
            <button 
                onClick={onLogout}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 text-red-500 hover:bg-red-50 rounded-xl font-medium transition-colors"
            >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>
                Log Out
            </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="ml-64 flex-1 p-8">
        <header className="flex justify-between items-center mb-8">
            <div className="flex items-center gap-4">
                <button 
                    onClick={() => navigate(-1)}
                    className="p-2 rounded-xl bg-white border border-gray-200 text-gray-500 hover:text-blue-600 hover:border-blue-200 transition-all shadow-sm"
                    title="Go Back"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
                </button>
                <div>
                    <h2 className="text-3xl font-bold text-gray-900">{title || 'Welcome Back'}</h2>
                    <p className="text-gray-500 mt-1">Manick Sriram M</p>
                </div>
            </div>
            <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-linear-to-tr from-purple-600 to-blue-500 rounded-full flex items-center justify-center text-white font-bold shadow-md">
                    MS
                </div>
            </div>
        </header>
        {children}
      </div>
    </div>
  );
};

export default CustomerLayout;
