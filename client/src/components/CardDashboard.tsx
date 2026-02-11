import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CreditCard from './CreditCard';
import CustomerLayout from './CustomerLayout';
import { useSocket } from '../context/SocketContext';
import type { Card } from '../types';

interface CardDashboardProps {
  onLogout: () => void;
}

const CardDashboard: React.FC<CardDashboardProps> = ({ onLogout }) => {
  const navigate = useNavigate();
  const { socket } = useSocket();
  const [card, setCard] = useState<Card | null>(null);

  const fetchCard = async () => {
    try {
        const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3001';
        const response = await fetch(`${apiUrl}/api/card`);
        if (response.ok) {
            const data = await response.json();
            setCard(data); 
        }
    } catch (error) {
        console.error('Error fetching card:', error);
    }
  };

  useEffect(() => {
    fetchCard();

    if (socket) {
        socket.on('card-updated', (updatedCard: Card) => {
            setCard(updatedCard);
        });
    }

    return () => {
        if (socket) {
            socket.off('card-updated');
        }
    }
  }, [socket]);

  const handleSettleBill = () => {
    navigate('/payment');
  };

  const utilization = card ? Math.round((card.balance / card.limit) * 100) : 0;

  return (
    <CustomerLayout onLogout={onLogout} title="Dashboard">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Card & Quick Actions */}
          <div className="lg:col-span-1 space-y-8">
            <div className="bg-white p-8 rounded-3xl shadow-xl flex flex-col items-center transform transition-all hover:shadow-2xl">
                <h2 className="text-lg font-semibold mb-6 text-gray-400 uppercase tracking-wider self-start">My Card</h2>
                <div className="transform hover:scale-105 transition-transform duration-300">
                    <CreditCard />
                </div>
                {card && (
                    <div className="mt-8 w-full space-y-4">
                        <div className="flex justify-between items-center py-3 border-b border-gray-100">
                            <span className="text-gray-500">Status</span>
                            <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">{card.status}</span>
                        </div>
                        <div className="flex justify-between items-center py-3 border-b border-gray-100">
                            <span className="text-gray-500">Card Type</span>
                            <span className="font-semibold text-gray-800">{card.type}</span>
                        </div>
                        <div className="flex justify-between items-center py-3">
                            <span className="text-gray-500">Credit Limit</span>
                            <span className="font-semibold text-gray-800">${card.limit.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
                        </div>
                    </div>
                )}
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
                
                {card && (
                    <div className="flex flex-col md:flex-row gap-8 items-center">
                        <div className="flex-1 w-full">
                            <p className="text-gray-500 mb-1">Statement Balance</p>
                            <p className="text-4xl font-extrabold text-gray-900">${card.balance.toLocaleString('en-US', { minimumFractionDigits: 2 })}</p>
                        </div>
                        <div className="flex-1 w-full">
                            <div className="flex justify-between mb-2">
                                <span className="text-gray-600 font-medium">Credit Utilization</span>
                                <span className="text-blue-600 font-bold">{utilization}%</span>
                            </div>
                            <div className="w-full bg-gray-100 rounded-full h-4 overflow-hidden">
                                <div className="bg-linear-to-r from-blue-500 to-purple-600 h-4 rounded-full transition-all duration-1000 ease-out" style={{ width: `${utilization}%` }}></div>
                            </div>
                            <p className="text-xs text-gray-400 mt-2 text-right">Used: ${card.balance.toLocaleString()} / Limit: ${card.limit.toLocaleString()}</p>
                        </div>
                    </div>
                )}

                <div className="mt-8 pt-6 border-t border-gray-100 flex justify-end">
                    <button 
                        onClick={handleSettleBill}
                        className="px-8 py-3 rounded-xl font-bold text-white shadow-lg transition-all transform hover:-translate-y-1 focus:ring-4 focus:ring-opacity-50 bg-gray-900 hover:bg-black focus:ring-gray-500"
                    >
                        Settle Bill Now
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
    </CustomerLayout>
  );
};

export default CardDashboard;
