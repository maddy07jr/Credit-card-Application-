import React, { useState } from 'react';
import CreditCard from './CreditCard';
import LogoutModal from './LogoutModal';

interface DashboardLandingProps {
  onLogout: () => void;
}

const DashboardLanding: React.FC<DashboardLandingProps> = ({ onLogout }) => {
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

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
      <div className="max-w-4xl mx-auto">
        <header className="mb-10 flex justify-between items-center">
            <div>
                <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">My Cards</h1>
                <p className="text-gray-500 mt-1">Welcome back, Manick Sriram M</p>
            </div>
            <div className="bg-white p-2 rounded-full shadow-sm cursor-pointer hover:bg-gray-100 transition-colors" onClick={handleLogoutClick} title="Logout">
                <div className="w-10 h-10 bg-linear-to-tr from-purple-600 to-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                    MS
                </div>
            </div>
        </header>

        <div className="flex flex-col items-center justify-center py-12">
            <CreditCard />
            <p className="mt-8 text-gray-400 text-sm">Click the card to view details</p>
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

export default DashboardLanding;
