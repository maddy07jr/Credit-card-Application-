import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

interface AdminLayoutProps {
  children: React.ReactNode;
  onLogout: () => void;
  title: string;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children, onLogout, title }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="min-h-screen bg-gray-900 text-white font-sans flex">
      {/* Sidebar */}
      <div className="w-64 bg-gray-800 border-r border-gray-700 flex flex-col fixed inset-y-0 left-0">
        <div className="p-6 border-b border-gray-700">
            <h1 className="text-2xl font-bold text-blue-400 cursor-pointer" onClick={() => navigate('/admin/dashboard')}>PMBank Admin</h1>
            <p className="text-xs text-gray-500 mt-1">Company Portal v2.0</p>
        </div>
        <nav className="p-4 space-y-2 flex-1">
            <div 
                onClick={() => navigate('/admin/dashboard')}
                className={`px-4 py-3 rounded-xl font-medium cursor-pointer transition-colors ${isActive('/admin/dashboard') ? 'bg-blue-600/10 text-blue-400' : 'text-gray-400 hover:bg-gray-700'}`}
            >
                Dashboard Overview
            </div>
            <div 
                onClick={() => navigate('/admin/users')}
                className={`px-4 py-3 rounded-xl font-medium cursor-pointer transition-colors ${isActive('/admin/users') ? 'bg-blue-600/10 text-blue-400' : 'text-gray-400 hover:bg-gray-700'}`}
            >
                User Management
            </div>
            <div 
                onClick={() => navigate('/admin/transactions')}
                className={`px-4 py-3 rounded-xl font-medium cursor-pointer transition-colors ${isActive('/admin/transactions') ? 'bg-blue-600/10 text-blue-400' : 'text-gray-400 hover:bg-gray-700'}`}
            >
                Transaction Logs
            </div>
            <div 
                onClick={() => navigate('/admin/approvals')}
                className={`px-4 py-3 rounded-xl font-medium cursor-pointer transition-colors ${isActive('/admin/approvals') ? 'bg-blue-600/10 text-blue-400' : 'text-gray-400 hover:bg-gray-700'}`}
            >
                Pending Approvals
            </div>
            <div 
                onClick={() => navigate('/admin/settings')}
                className={`px-4 py-3 rounded-xl font-medium cursor-pointer transition-colors ${isActive('/admin/settings') ? 'bg-blue-600/10 text-blue-400' : 'text-gray-400 hover:bg-gray-700'}`}
            >
                System Settings
            </div>
        </nav>
        <div className="p-4 border-t border-gray-700">
            <button 
                onClick={onLogout}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 text-red-400 hover:bg-red-500/10 rounded-xl font-medium transition-colors"
            >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>
                Sign Out
            </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="ml-64 flex-1 p-8">
        <header className="flex justify-between items-center mb-8">
            <div className="flex items-center gap-4">
                <button 
                    onClick={() => navigate(-1)}
                    className="p-2 rounded-lg bg-gray-800 border border-gray-700 text-gray-400 hover:text-white hover:border-gray-500 transition-all"
                    title="Go Back"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
                </button>
                <h2 className="text-3xl font-bold">{title}</h2>
            </div>
            <div className="flex items-center gap-4">
                <div className="text-right">
                    <p className="font-medium">Admin User</p>
                    <p className="text-xs text-gray-500">Super Admin</p>
                </div>
                <div className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center font-bold text-blue-400">
                    AD
                </div>
            </div>
        </header>
        {children}
      </div>
    </div>
  );
};

export default AdminLayout;
