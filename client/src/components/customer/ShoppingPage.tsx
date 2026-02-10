
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CustomerLayout from '../CustomerLayout';

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  image: string;
  merchant: string;
}

const PRODUCTS: Product[] = [
  { id: 1, name: 'Wireless Noise-Canceling Headphones', category: 'Electronics', price: 299.99, merchant: 'TechHaven', image: '🎧' },
  { id: 2, name: 'Smart Watch Series 7', category: 'Electronics', price: 399.00, merchant: 'GadgetStore', image: '⌚' },
  { id: 3, name: 'Designer Leather Bag', category: 'Fashion', price: 1250.00, merchant: 'LuxeBoutique', image: '👜' },
  { id: 4, name: 'Running Shoes', category: 'Fashion', price: 120.50, merchant: 'RunFast', image: '👟' },
  { id: 5, name: 'Espresso Machine', category: 'Home', price: 450.00, merchant: 'HomeBrew', image: '☕' },
  { id: 6, name: 'Gaming Console', category: 'Electronics', price: 499.99, merchant: 'GameZone', image: '🎮' },
  { id: 7, name: 'Weekend Getaway Package', category: 'Travel', price: 899.00, merchant: 'TravelNow', image: '✈️' },
  { id: 8, name: 'Organic Grocery Basket', category: 'Groceries', price: 85.20, merchant: 'GreenMarket', image: '🥦' },
];

interface ShoppingPageProps {
  onLogout: () => void;
}

const ShoppingPage: React.FC<ShoppingPageProps> = ({ onLogout }) => {
  const navigate = useNavigate();
  const [processingId, setProcessingId] = useState<number | null>(null);

  const handleBuy = async (product: Product) => {
    setProcessingId(product.id);

    try {
        const response = await fetch('http://localhost:3001/api/transactions', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                merchant: product.merchant,
                category: product.category,
                amount: product.price, // Positive amount increases balance (spending)
                userId: 'user1'
            })
        });

        if (response.ok) {
            // Simulate processing delay
            setTimeout(() => {
                setProcessingId(null);
                alert(`Successfully purchased ${product.name}!`);
                navigate('/transactions');
            }, 1000);
        } else {
            alert('Purchase failed. Please try again.');
            setProcessingId(null);
        }
    } catch (error) {
        console.error('Purchase error:', error);
        setProcessingId(null);
    }
  };

  return (
    <CustomerLayout onLogout={onLogout} title="Shop & Earn Rewards">
        <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {PRODUCTS.map((product) => (
                    <div key={product.id} className="bg-white rounded-3xl shadow-lg overflow-hidden flex flex-col hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
                        <div className="h-48 bg-gray-100 flex items-center justify-center text-8xl">
                            {product.image}
                        </div>
                        <div className="p-6 flex-1 flex flex-col">
                            <div className="flex justify-between items-start mb-2">
                                <span className="text-xs font-bold px-2 py-1 bg-gray-100 text-gray-500 rounded-full uppercase tracking-wide">{product.category}</span>
                                <span className="text-sm text-gray-400">{product.merchant}</span>
                            </div>
                            <h3 className="text-lg font-bold text-gray-900 mb-2 leading-tight">{product.name}</h3>
                            <div className="mt-auto pt-4 flex items-center justify-between">
                                <span className="text-2xl font-bold text-gray-900">${product.price.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
                                <button 
                                    onClick={() => handleBuy(product)}
                                    disabled={processingId === product.id}
                                    className={`px-4 py-2 rounded-xl font-bold text-white text-sm transition-all ${
                                        processingId === product.id
                                        ? 'bg-gray-400 cursor-wait'
                                        : 'bg-black hover:bg-gray-800 shadow-md hover:shadow-lg'
                                    }`}
                                >
                                    {processingId === product.id ? 'Buying...' : 'Buy Now'}
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </CustomerLayout>
  );
};

export default ShoppingPage;
