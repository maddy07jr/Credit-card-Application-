import React from 'react';
import { useNavigate } from 'react-router-dom';
import AdminLayout from './AdminLayout';
import { useSocket } from '../context/SocketContext';
import type { Transaction, DashboardStats } from '../types';

interface AdminDashboardProps {
  onLogout: () => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ onLogout }) => {
  const navigate = useNavigate();
  const { socket } = useSocket();
  const [stats, setStats] = React.useState<DashboardStats>({
    totalVolume: 0,
    activeCards: 0,
    pendingApprovals: 0
  });
  const [transactions, setTransactions] = React.useState<Transaction[]>([]);

  const fetchTransactions = async () => {
    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3001';
      const response = await fetch(`${apiUrl}/api/transactions`);
      const data = await response.json();
      setTransactions(data.slice(0, 5)); // Just take recent 5
    } catch (error) {
      console.error('Error fetching transactions:', error);
    }
  };

  const fetchStats = async () => {
    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3001';
      const response = await fetch(`${apiUrl}/api/dashboard/stats`);
      const data = await response.json();
      setStats(data);
    } catch (error) {
      console.error('Error fetching dashboard stats:', error);
    }
  };

  React.useEffect(() => {
    fetchStats();
    fetchTransactions();

    if (socket) {
      socket.on('stats-updated', (newStats: DashboardStats) => {
        setStats(newStats);
      });

      socket.on('new-transaction', (newTx: Transaction) => {
        setTransactions(prev => [newTx, ...prev].slice(0, 5));
        fetchStats(); // Refresh stats as they might be calculated server-side
      });
      
      socket.on('transaction-updated', () => {
        fetchTransactions();
        fetchStats();
      })
    }

    return () => {
      if (socket) {
        socket.off('stats-updated');
        socket.off('new-transaction');
        socket.off('transaction-updated');
      }
    };
  }, [socket]);

  return (
    <AdminLayout onLogout={onLogout} title="System Overview">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div 
                onClick={() => navigate('/admin/users')}
                className="bg-gray-800 p-6 rounded-2xl border border-gray-700 cursor-pointer hover:border-blue-500 transition-colors group"
            >
                <p className="text-gray-400 text-sm mb-1 group-hover:text-blue-400 transition-colors">Total Active Cards</p>
                <h3 className="text-3xl font-bold text-white">{stats.activeCards.toLocaleString()}</h3>
                <p className="text-green-400 text-sm mt-2 flex items-center">
                    <span className="mr-1">↑</span> 12% from last month
                </p>
            </div>
            <div 
                onClick={() => navigate('/admin/transactions')}
                className="bg-gray-800 p-6 rounded-2xl border border-gray-700 cursor-pointer hover:border-blue-500 transition-colors group"
            >
                <p className="text-gray-400 text-sm mb-1 group-hover:text-blue-400 transition-colors">Total Transaction Volume</p>
                <h3 className="text-3xl font-bold text-white">${stats.totalVolume.toLocaleString()}</h3>
                <p className="text-blue-400 text-sm mt-2 flex items-center">
                    <span className="mr-1">↑</span> 8% from last month
                </p>
            </div>
            <div 
                onClick={() => navigate('/admin/approvals')}
                className="bg-gray-800 p-6 rounded-2xl border border-gray-700 cursor-pointer hover:border-blue-500 transition-colors group"
            >
                <p className="text-gray-400 text-sm mb-1 group-hover:text-blue-400 transition-colors">Pending Approvals</p>
                <h3 className="text-3xl font-bold text-white">{stats.pendingApprovals}</h3>
                <p className="text-yellow-400 text-sm mt-2 flex items-center">
                    Requires attention
                </p>
            </div>
        </div>

        {/* Recent Transactions */}
        <div className="bg-gray-800 rounded-2xl border border-gray-700 overflow-hidden">
            <div className="p-6 border-b border-gray-700 flex justify-between items-center">
                <h3 className="text-xl font-bold">Recent System Transactions</h3>
                <button 
                    onClick={() => navigate('/admin/transactions')}
                    className="text-blue-400 text-sm hover:text-blue-300"
                >
                    View All
                </button>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead className="bg-gray-700/50 text-gray-400 text-sm uppercase">
                        <tr>
                            <th className="px-6 py-4 font-medium">Transaction ID</th>
                            <th className="px-6 py-4 font-medium">User</th>
                            <th className="px-6 py-4 font-medium">Merchant</th>
                            <th className="px-6 py-4 font-medium">Amount</th>
                            <th className="px-6 py-4 font-medium">Status</th>
                            <th className="px-6 py-4 font-medium">Date</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-700">
                        {transactions.map((tx) => (
                            <tr key={tx.id} className="hover:bg-gray-700/30 transition-colors">
                                <td className="px-6 py-4 text-sm font-mono text-gray-400">#TRX-{tx.id.slice(-4)}</td>
                                <td className="px-6 py-4 font-medium">User</td>
                                <td className="px-6 py-4">{tx.merchant}</td>
                                <td className="px-6 py-4 font-medium text-white">${Math.abs(tx.amount).toFixed(2)}</td>
                                <td className="px-6 py-4">
                                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                                        tx.status === 'Completed' ? 'bg-green-500/10 text-green-400' :
                                        tx.status === 'Pending' ? 'bg-yellow-500/10 text-yellow-400' :
                                        'bg-red-500/10 text-red-400'
                                    }`}>
                                        {tx.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-gray-400 text-sm">{tx.date}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    </AdminLayout>
  );
};
export default AdminDashboard;
