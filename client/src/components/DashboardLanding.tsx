import React from 'react';
import { useNavigate } from 'react-router-dom';
import CreditCard from './CreditCard';
import CustomerLayout from './CustomerLayout';

interface DashboardLandingProps {
  onLogout: () => void;
}

const DashboardLanding: React.FC<DashboardLandingProps> = ({ onLogout }) => {
  const navigate = useNavigate();

  return (
    <CustomerLayout onLogout={onLogout} title="My Cards">
        <div className="flex flex-col items-center justify-center py-12">
            <CreditCard />
            <div className="mt-8 flex gap-4">
                <button 
                  onClick={() => navigate('/shop')}
                  className="px-8 py-3 bg-black text-white rounded-xl font-bold hover:bg-gray-800 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                >
                  Shop Now
                </button>
            </div>
            <p className="mt-4 text-gray-400 text-sm">Click the card to view details</p>
        </div>
    </CustomerLayout>
  );
};

export default DashboardLanding;
