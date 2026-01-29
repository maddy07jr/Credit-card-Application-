import React from 'react';
import { useNavigate } from 'react-router-dom';

const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 font-sans">
      <div className="max-w-4xl w-full px-6">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-extrabold text-gray-900 mb-4 tracking-tight">Welcome to PMBank</h1>
          <p className="text-xl text-gray-500">Secure, reliable, and designed for you.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Customer Portal Card */}
          <div 
            onClick={() => navigate('/login')}
            className="group bg-white p-10 rounded-3xl shadow-xl hover:shadow-2xl transition-all cursor-pointer border border-transparent hover:border-blue-100 transform hover:-translate-y-2"
          >
            <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mb-6 text-3xl text-blue-600 group-hover:scale-110 transition-transform">
              👤
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">Customer Login</h2>
            <p className="text-gray-500 mb-8 leading-relaxed">
              Access your personal accounts, view statements, and manage your cards securely.
            </p>
            <div className="flex items-center text-blue-600 font-semibold group-hover:translate-x-2 transition-transform">
              Go to Personal Banking <span className="ml-2">→</span>
            </div>
          </div>

          {/* Company Portal Card */}
          <div 
            onClick={() => navigate('/admin')}
            className="group bg-gray-900 p-10 rounded-3xl shadow-xl hover:shadow-2xl transition-all cursor-pointer transform hover:-translate-y-2"
          >
            <div className="w-16 h-16 bg-gray-800 rounded-2xl flex items-center justify-center mb-6 text-3xl text-white group-hover:scale-110 transition-transform">
              🏢
            </div>
            <h2 className="text-2xl font-bold text-white mb-3">Company Portal</h2>
            <p className="text-gray-400 mb-8 leading-relaxed">
              Authorized access for administrators to manage users, transactions, and system settings.
            </p>
            <div className="flex items-center text-blue-400 font-semibold group-hover:translate-x-2 transition-transform">
              Go to Admin Console <span className="ml-2">→</span>
            </div>
          </div>
        </div>

        <footer className="mt-16 text-center text-gray-400 text-sm">
          &copy; 2024 PMBank Corporation. All rights reserved.
        </footer>
      </div>
    </div>
  );
};

export default LandingPage;
