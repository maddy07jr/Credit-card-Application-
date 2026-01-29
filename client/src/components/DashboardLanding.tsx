import React from 'react';
import CreditCard from './CreditCard';
import CustomerLayout from './CustomerLayout';

interface DashboardLandingProps {
  onLogout: () => void;
}

const DashboardLanding: React.FC<DashboardLandingProps> = ({ onLogout }) => {
  return (
    <CustomerLayout onLogout={onLogout} title="My Cards">
        <div className="flex flex-col items-center justify-center py-12">
            <CreditCard />
            <p className="mt-8 text-gray-400 text-sm">Click the card to view details</p>
        </div>
    </CustomerLayout>
  );
};

export default DashboardLanding;
