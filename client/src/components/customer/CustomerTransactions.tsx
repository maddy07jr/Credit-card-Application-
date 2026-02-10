import React, { useState } from 'react';
import CustomerLayout from '../CustomerLayout';
import { useSocket } from '../../context/SocketContext';
import type { Transaction } from '../../types';

interface CustomerTransactionsProps {
  onLogout: () => void;
}

const CustomerTransactions: React.FC<CustomerTransactionsProps> = ({ onLogout }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const { socket } = useSocket();
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const fetchTransactions = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/transactions');
      const data = await response.json();
      setTransactions(data);
    } catch (error) {
      console.error('Error fetching transactions:', error);
    }
  };

  React.useEffect(() => {
    fetchTransactions();

    if (socket) {
      socket.on('new-transaction', (newTx: Transaction) => {
        setTransactions(prev => [newTx, ...prev]);
      });
      
      socket.on('transaction-updated', (updatedTx: Transaction) => {
        setTransactions(prev => prev.map(tx => tx.id === updatedTx.id ? updatedTx : tx));
      });
    }

    return () => {
      if (socket) {
        socket.off('new-transaction');
        socket.off('transaction-updated');
      }
    };
  }, [socket]);

  const filteredTransactions = transactions.filter(tx => 
    tx.merchant.toLowerCase().includes(searchQuery.toLowerCase()) ||
    tx.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
        case 'Completed': return 'bg-green-100 text-green-700';
        case 'Pending': return 'bg-yellow-100 text-yellow-700';
        case 'Declined': return 'bg-red-100 text-red-700';
        default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <CustomerLayout onLogout={onLogout} title="Transaction History">
      <div className="bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex gap-4">
             <input 
                type="text" 
                placeholder="Search transactions by merchant or category..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all"
            />
            {/* Filter button can be expanded later for advanced filters */}
            <button className="bg-gray-900 text-white px-6 py-3 rounded-xl font-medium hover:bg-black transition-colors">
                Filter
            </button>
        </div>
        <div className="overflow-x-auto">
            <table className="w-full text-left">
                <thead className="bg-gray-50 text-gray-500 text-sm uppercase tracking-wider">
                    <tr>
                        <th className="px-8 py-4 font-semibold">Merchant</th>
                        <th className="px-8 py-4 font-semibold">Category</th>
                        <th className="px-8 py-4 font-semibold">Date</th>
                        <th className="px-8 py-4 font-semibold">Status</th>
                        <th className="px-8 py-4 font-semibold text-right">Amount</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                    {filteredTransactions.length > 0 ? (
                        filteredTransactions.map((tx) => (
                            <tr key={tx.id} className="hover:bg-gray-50 transition-colors">
                                <td className="px-8 py-5 font-medium text-gray-900 flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-xl">{tx.icon}</div>
                                    {tx.merchant}
                                </td>
                                <td className="px-8 py-5 text-gray-500">{tx.category}</td>
                                <td className="px-8 py-5 text-gray-500">{tx.date}</td>
                                <td className="px-8 py-5"><span className={`${getStatusColor(tx.status)} px-3 py-1 rounded-full text-xs font-bold`}>{tx.status}</span></td>
                                <td className={`px-8 py-5 font-bold text-right ${tx.amount > 0 ? 'text-green-600' : 'text-gray-900'}`}>
                                    {tx.amount > 0 ? '+' : ''}{tx.amount.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={5} className="px-8 py-12 text-center text-gray-500">
                                No transactions found matching "{searchQuery}"
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
      </div>
    </CustomerLayout>
  );
};

export default CustomerTransactions;
