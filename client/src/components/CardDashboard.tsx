import React, { useState } from 'react';
import CreditCard from './CreditCard';
import LogoutModal from './LogoutModal';

interface CardDashboardProps {
  onLogout: () => void;
}

const CardDashboard: React.FC<CardDashboardProps> = ({ onLogout }) => {
  const [isBillSettled, setIsBillSettled] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  const handleSettleBill = () => {
    setIsBillSettled(true);
    setTimeout(() => setIsBillSettled(false), 3000);
  };

  const handleLogoutClick = () => {
    setIsLogoutModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsLogoutModalOpen(false);
  };

  const handleConfirmLogout = () => {
    setIsLogoutModalOpen(false);
    onLogout();
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8 font-sans">
      <div className="max-w-6xl mx-auto">
        <header className="mb-10 flex justify-between items-center">
            <div>
                <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">Dashboard</h1>
                <p className="text-gray-500 mt-1">Welcome back, Manick Sriram M</p>
            </div>
            <div className="bg-white p-2 rounded-full shadow-sm cursor-pointer hover:bg-gray-100 transition-colors" onClick={handleLogoutClick} title="Logout">
                <div className="w-10 h-10 bg-linear-to-tr from-purple-600 to-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                    MS
                </div>
            </div>
        </header>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Card & Quick Actions */}
          <div className="lg:col-span-1 space-y-8">
            <div className="bg-white p-8 rounded-3xl shadow-xl flex flex-col items-center transform transition-all hover:shadow-2xl">
                <h2 className="text-lg font-semibold mb-6 text-gray-400 uppercase tracking-wider self-start">My Card</h2>
                <div className="transform hover:scale-105 transition-transform duration-300">
                    <CreditCard />
                </div>
                <div className="mt-8 w-full space-y-4">
                    <div className="flex justify-between items-center py-3 border-b border-gray-100">
                        <span className="text-gray-500">Status</span>
                        <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">Active</span>
                    </div>
                    <div className="flex justify-between items-center py-3 border-b border-gray-100">
                        <span className="text-gray-500">Card Type</span>
                        <span className="font-semibold text-gray-800">Platinum Rewards</span>
                    </div>
                    <div className="flex justify-between items-center py-3">
                        <span className="text-gray-500">Credit Limit</span>
                        <span className="font-semibold text-gray-800">$15,000.00</span>
                    </div>
                </div>
            </div>
          </div>

          {/* Right Column: Balance & Perks */}
          <div className="lg:col-span-2 space-y-8">
            {/* Balance Card */}
            <div className="bg-white p-8 rounded-3xl shadow-xl">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold text-gray-800">Current Balance</h2>
                    <span className="text-sm text-gray-400">Updated just now</span>
                </div>
                
                <div className="flex flex-col md:flex-row gap-8 items-center">
                    <div className="flex-1 w-full">
                        <p className="text-gray-500 mb-1">Statement Balance</p>
                        <p className="text-4xl font-extrabold text-gray-900">$1,245.50</p>
                    </div>
                    <div className="flex-1 w-full">
                        <div className="flex justify-between mb-2">
                            <span className="text-gray-600 font-medium">Credit Utilization</span>
                            <span className="text-blue-600 font-bold">45%</span>
                        </div>
                        <div className="w-full bg-gray-100 rounded-full h-4 overflow-hidden">
                            <div className="bg-linear-to-r from-blue-500 to-purple-600 h-4 rounded-full transition-all duration-1000 ease-out" style={{ width: '45%' }}></div>
                        </div>
                        <p className="text-xs text-gray-400 mt-2 text-right">Used: $450.20 / Limit: $15,000</p>
                    </div>
                </div>

                <div className="mt-8 pt-6 border-t border-gray-100 flex justify-end">
                    <button 
                        onClick={handleSettleBill}
                        className={`px-8 py-3 rounded-xl font-bold text-white shadow-lg transition-all transform hover:-translate-y-1 focus:ring-4 focus:ring-opacity-50 ${
                            isBillSettled 
                            ? 'bg-green-500 focus:ring-green-300 cursor-default' 
                            : 'bg-gray-900 hover:bg-black focus:ring-gray-500'
                        }`}
                        disabled={isBillSettled}
                    >
                        {isBillSettled ? (
                            <span className="flex items-center gap-2">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                                Paid Successfully
                            </span>
                        ) : 'Settle Bill Now'}
                    </button>
                </div>
            </div>

            {/* Perks Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-linear-to-br from-purple-500 to-indigo-600 p-6 rounded-2xl shadow-lg text-white transform hover:scale-105 transition-transform cursor-pointer">
                    <div className="bg-white/20 w-12 h-12 rounded-xl flex items-center justify-center mb-4 text-2xl">✈️</div>
                    <h3 className="font-bold text-lg mb-1">Travel</h3>
                    <p className="text-purple-100 text-sm">2x Miles on all flights</p>
                </div>
                <div className="bg-linear-to-br from-pink-500 to-rose-500 p-6 rounded-2xl shadow-lg text-white transform hover:scale-105 transition-transform cursor-pointer">
                    <div className="bg-white/20 w-12 h-12 rounded-xl flex items-center justify-center mb-4 text-2xl">🍽️</div>
                    <h3 className="font-bold text-lg mb-1">Dining</h3>
                    <p className="text-pink-100 text-sm">3x Points on restaurants</p>
                </div>
                <div className="bg-linear-to-br from-blue-400 to-cyan-500 p-6 rounded-2xl shadow-lg text-white transform hover:scale-105 transition-transform cursor-pointer">
                    <div className="bg-white/20 w-12 h-12 rounded-xl flex items-center justify-center mb-4 text-2xl">🛡️</div>
                    <h3 className="font-bold text-lg mb-1">Protection</h3>
                    <p className="text-blue-100 text-sm">Zero liability coverage</p>
                </div>
            </div>
          </div>
        </div>
      </div>

      <LogoutModal 
        isOpen={isLogoutModalOpen} 
        onClose={handleCloseModal} 
        onConfirm={handleConfirmLogout} 
      />
    </div>
  );
};

export default CardDashboard;
