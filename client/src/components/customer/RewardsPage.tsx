import React from 'react';
import CustomerLayout from '../CustomerLayout';

interface RewardsPageProps {
  onLogout: () => void;
}

const RewardsPage: React.FC<RewardsPageProps> = ({ onLogout }) => {
  return (
    <CustomerLayout onLogout={onLogout} title="My Rewards">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
        <div className="bg-linear-to-br from-yellow-400 to-orange-500 p-8 rounded-3xl shadow-lg text-white relative overflow-hidden">
            <div className="relative z-10">
                <p className="text-yellow-100 font-medium mb-1">Available Points</p>
                <h3 className="text-4xl font-extrabold">24,500</h3>
                <p className="text-sm mt-4 bg-white/20 inline-block px-3 py-1 rounded-full">Worth $245.00</p>
            </div>
            <div className="absolute -right-4 -bottom-4 text-9xl opacity-20">🏆</div>
        </div>
        
        <div className="md:col-span-2 bg-white p-8 rounded-3xl shadow-lg border border-gray-100 flex items-center justify-between">
            <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Platinum Status</h3>
                <p className="text-gray-500 mb-4">You're in the top 5% of earners! Keep using your card to unlock exclusive perks.</p>
                <div className="w-full bg-gray-100 rounded-full h-3 max-w-md">
                    <div className="bg-linear-to-r from-yellow-400 to-orange-500 h-3 rounded-full" style={{ width: '75%' }}></div>
                </div>
                <p className="text-xs text-gray-400 mt-2">5,500 points to Diamond Status</p>
            </div>
            <div className="text-5xl">💎</div>
        </div>
      </div>

      <h3 className="text-xl font-bold text-gray-900 mb-6">Redeem Points</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
            { title: 'Amazon Gift Card', cost: '5,000 pts', icon: '🛍️' },
            { title: 'Airline Miles', cost: '10,000 pts', icon: '✈️' },
            { title: 'Cash Back', cost: '1,000 pts', icon: '💵' },
            { title: 'Hotel Stay', cost: '15,000 pts', icon: '🏨' },
        ].map((reward, index) => (
            <div key={index} className="bg-white p-6 rounded-2xl shadow-md border border-gray-100 hover:shadow-xl transition-shadow cursor-pointer group">
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">{reward.icon}</div>
                <h4 className="font-bold text-gray-900 mb-1">{reward.title}</h4>
                <p className="text-blue-600 font-medium text-sm">{reward.cost}</p>
                <button className="w-full mt-4 bg-gray-50 text-gray-900 py-2 rounded-xl font-medium hover:bg-blue-600 hover:text-white transition-colors">
                    Redeem
                </button>
            </div>
        ))}
      </div>
    </CustomerLayout>
  );
};

export default RewardsPage;
