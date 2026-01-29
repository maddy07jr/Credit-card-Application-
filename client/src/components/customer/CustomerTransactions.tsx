import React, { useState } from 'react';
import CustomerLayout from '../CustomerLayout';

interface CustomerTransactionsProps {
  onLogout: () => void;
}

const CustomerTransactions: React.FC<CustomerTransactionsProps> = ({ onLogout }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const transactions = [
    { id: 1, merchant: 'Apple Store', category: 'Electronics', date: 'Oct 24, 2023', status: 'Completed', amount: -1299.00, icon: '🍎', statusColor: 'bg-green-100 text-green-700' },
    { id: 2, merchant: 'Uber Rides', category: 'Transport', date: 'Oct 24, 2023', status: 'Completed', amount: -24.50, icon: '🚗', statusColor: 'bg-green-100 text-green-700' },
    { id: 3, merchant: 'Starbucks', category: 'Dining', date: 'Oct 23, 2023', status: 'Completed', amount: -12.75, icon: '☕', statusColor: 'bg-green-100 text-green-700' },
    { id: 4, merchant: 'Salary Deposit', category: 'Income', date: 'Oct 15, 2023', status: 'Received', amount: 4500.00, icon: '💼', statusColor: 'bg-blue-100 text-blue-700' },
    { id: 5, merchant: 'Netflix', category: 'Entertainment', date: 'Oct 14, 2023', status: 'Completed', amount: -15.99, icon: '🎬', statusColor: 'bg-green-100 text-green-700' },
    { id: 6, merchant: 'Amazon', category: 'Shopping', date: 'Oct 12, 2023', status: 'Pending', amount: -89.50, icon: '📦', statusColor: 'bg-yellow-100 text-yellow-700' },
  ];

  const filteredTransactions = transactions.filter(tx => 
    tx.merchant.toLowerCase().includes(searchQuery.toLowerCase()) ||
    tx.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
                                <td className="px-8 py-5"><span className={`${tx.statusColor} px-3 py-1 rounded-full text-xs font-bold`}>{tx.status}</span></td>
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
