
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CustomerLayout from '../CustomerLayout';
import type { Card } from '../../types';

interface PaymentPageProps {
  onLogout: () => void;
}

const PaymentPage: React.FC<PaymentPageProps> = ({ onLogout }) => {
  const navigate = useNavigate();
  const [card, setCard] = useState<Card | null>(null);
  const [selectedOption, setSelectedOption] = useState<'statement' | 'current' | 'minimum' | 'custom'>('statement');
  const [customAmount, setCustomAmount] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    // Fetch card details to get balance
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
    fetchCard();
  }, []);

  if (!card) return <CustomerLayout onLogout={onLogout} title="Make a Payment"><div className="p-8">Loading...</div></CustomerLayout>;

  // Calculate amounts
  const statementBalance = card.balance; // Assuming statement = current for this demo
  const currentDue = card.balance;
  const minimumDue = Math.max(25, card.balance * 0.05); // 5% or $25

  const getPaymentAmount = () => {
    switch (selectedOption) {
        case 'statement': return statementBalance;
        case 'current': return currentDue;
        case 'minimum': return minimumDue;
        case 'custom': return parseFloat(customAmount) || 0;
        default: return 0;
    }
  };

  const handlePayment = async () => {
    const amount = getPaymentAmount();
    if (amount <= 0) return;

    setIsProcessing(true);

    try {
        const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3001';
        const response = await fetch(`${apiUrl}/api/transactions`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                merchant: 'Payment Received',
                category: 'Payment',
                amount: -amount, // Negative amount to reduce balance
                // userId is handled by server default 'user1' for this demo
            })
        });

        if (response.ok) {
            // Simulate processing delay for effect
            setTimeout(() => {
                navigate('/card-details');
            }, 1500);
        } else {
            alert('Payment failed. Please try again.');
            setIsProcessing(false);
        }
    } catch (error) {
        console.error('Payment error:', error);
        setIsProcessing(false);
    }
  };

  return (
    <CustomerLayout onLogout={onLogout} title="Make a Payment">
        <div className="max-w-2xl mx-auto space-y-8">
            {/* Card Summary */}
            <div className="bg-linear-to-r from-gray-900 to-gray-800 text-white p-8 rounded-3xl shadow-xl">
                <p className="text-gray-400 mb-1">Total Balance</p>
                <h2 className="text-4xl font-bold mb-6">${card.balance.toLocaleString('en-US', { minimumFractionDigits: 2 })}</h2>
                <div className="flex justify-between text-sm text-gray-400">
                    <span>{card.nameOnCard}</span>
                    <span>•••• {card.number.slice(-4)}</span>
                </div>
            </div>

            {/* Payment Options */}
            <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Select Amount</h3>
                
                <div className="space-y-4">
                    <label className={`flex items-center justify-between p-4 rounded-xl border-2 cursor-pointer transition-all ${selectedOption === 'statement' ? 'border-blue-500 bg-blue-50' : 'border-gray-100 hover:border-gray-200'}`}>
                        <div className="flex items-center gap-3">
                            <input 
                                type="radio" 
                                name="paymentOption" 
                                checked={selectedOption === 'statement'} 
                                onChange={() => setSelectedOption('statement')}
                                className="text-blue-600 focus:ring-blue-500"
                            />
                            <span className="font-medium text-gray-900">Statement Balance</span>
                        </div>
                        <span className="font-bold text-gray-900">${statementBalance.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
                    </label>

                    <label className={`flex items-center justify-between p-4 rounded-xl border-2 cursor-pointer transition-all ${selectedOption === 'current' ? 'border-blue-500 bg-blue-50' : 'border-gray-100 hover:border-gray-200'}`}>
                        <div className="flex items-center gap-3">
                            <input 
                                type="radio" 
                                name="paymentOption" 
                                checked={selectedOption === 'current'} 
                                onChange={() => setSelectedOption('current')}
                                className="text-blue-600 focus:ring-blue-500"
                            />
                            <span className="font-medium text-gray-900">Current Due</span>
                        </div>
                        <span className="font-bold text-gray-900">${currentDue.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
                    </label>

                    <label className={`flex items-center justify-between p-4 rounded-xl border-2 cursor-pointer transition-all ${selectedOption === 'minimum' ? 'border-blue-500 bg-blue-50' : 'border-gray-100 hover:border-gray-200'}`}>
                        <div className="flex items-center gap-3">
                            <input 
                                type="radio" 
                                name="paymentOption" 
                                checked={selectedOption === 'minimum'} 
                                onChange={() => setSelectedOption('minimum')}
                                className="text-blue-600 focus:ring-blue-500"
                            />
                            <span className="font-medium text-gray-900">Minimum Payment</span>
                        </div>
                        <span className="font-bold text-gray-900">${minimumDue.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
                    </label>

                    <label className={`flex flex-col p-4 rounded-xl border-2 cursor-pointer transition-all ${selectedOption === 'custom' ? 'border-blue-500 bg-blue-50' : 'border-gray-100 hover:border-gray-200'}`}>
                        <div className="flex items-center gap-3 mb-3">
                            <input 
                                type="radio" 
                                name="paymentOption" 
                                checked={selectedOption === 'custom'} 
                                onChange={() => setSelectedOption('custom')}
                                className="text-blue-600 focus:ring-blue-500"
                            />
                            <span className="font-medium text-gray-900">Custom Amount</span>
                        </div>
                        {selectedOption === 'custom' && (
                             <div className="relative">
                                <span className="absolute left-4 top-3 text-gray-500">$</span>
                                <input 
                                    type="number" 
                                    value={customAmount}
                                    onChange={(e) => setCustomAmount(e.target.value)}
                                    placeholder="0.00"
                                    className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>
                        )}
                    </label>
                </div>
                
                <div className="mt-8">
                     <button 
                        onClick={handlePayment}
                        disabled={isProcessing || getPaymentAmount() <= 0}
                        className={`w-full py-4 rounded-xl font-bold text-lg text-white shadow-lg transition-all ${
                            isProcessing 
                            ? 'bg-gray-400 cursor-not-allowed' 
                            : 'bg-black hover:bg-gray-800 hover:shadow-xl transform hover:-translate-y-1'
                        }`}
                    >
                        {isProcessing ? 'Processing...' : `Pay $${getPaymentAmount().toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
                    </button>
                    <p className="text-center text-sm text-gray-500 mt-4">Safe & Secure 256-bit SSL Encrypted Payment</p>
                </div>
            </div>
        </div>
    </CustomerLayout>
  );
};

export default PaymentPage;
