import React from 'react';
import { useNavigate } from 'react-router-dom';
import AdminLayout from './AdminLayout';

interface AdminDashboardProps {
  onLogout: () => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ onLogout }) => {
  const navigate = useNavigate();

  return (
    <AdminLayout onLogout={onLogout} title="System Overview">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div 
                onClick={() => navigate('/admin/users')}
                className="bg-gray-800 p-6 rounded-2xl border border-gray-700 cursor-pointer hover:border-blue-500 transition-colors group"
            >
                <p className="text-gray-400 text-sm mb-1 group-hover:text-blue-400 transition-colors">Total Active Cards</p>
                <h3 className="text-3xl font-bold text-white">1,245</h3>
                <p className="text-green-400 text-sm mt-2 flex items-center">
                    <span className="mr-1">↑</span> 12% from last month
                </p>
            </div>
            <div 
                onClick={() => navigate('/admin/transactions')}
                className="bg-gray-800 p-6 rounded-2xl border border-gray-700 cursor-pointer hover:border-blue-500 transition-colors group"
            >
                <p className="text-gray-400 text-sm mb-1 group-hover:text-blue-400 transition-colors">Total Transaction Volume</p>
                <h3 className="text-3xl font-bold text-white">$4.2M</h3>
                <p className="text-blue-400 text-sm mt-2 flex items-center">
                    <span className="mr-1">↑</span> 8% from last month
                </p>
            </div>
            <div 
                onClick={() => navigate('/admin/approvals')}
                className="bg-gray-800 p-6 rounded-2xl border border-gray-700 cursor-pointer hover:border-blue-500 transition-colors group"
            >
                <p className="text-gray-400 text-sm mb-1 group-hover:text-blue-400 transition-colors">Pending Approvals</p>
                <h3 className="text-3xl font-bold text-white">28</h3>
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
                        <tr className="hover:bg-gray-700/30 transition-colors">
                            <td className="px-6 py-4 text-sm font-mono text-gray-400">#TRX-9821</td>
                            <td className="px-6 py-4 font-medium">Manick Sriram M</td>
                            <td className="px-6 py-4">Apple Store</td>
                            <td className="px-6 py-4 font-medium text-white">$1,299.00</td>
                            <td className="px-6 py-4"><span className="bg-green-500/10 text-green-400 px-2 py-1 rounded text-xs font-medium">Completed</span></td>
                            <td className="px-6 py-4 text-gray-400 text-sm">Oct 24, 2023</td>
                        </tr>
                        <tr className="hover:bg-gray-700/30 transition-colors">
                            <td className="px-6 py-4 text-sm font-mono text-gray-400">#TRX-9820</td>
                            <td className="px-6 py-4 font-medium">Sarah Johnson</td>
                            <td className="px-6 py-4">Uber Rides</td>
                            <td className="px-6 py-4 font-medium text-white">$24.50</td>
                            <td className="px-6 py-4"><span className="bg-green-500/10 text-green-400 px-2 py-1 rounded text-xs font-medium">Completed</span></td>
                            <td className="px-6 py-4 text-gray-400 text-sm">Oct 24, 2023</td>
                        </tr>
                        <tr className="hover:bg-gray-700/30 transition-colors">
                            <td className="px-6 py-4 text-sm font-mono text-gray-400">#TRX-9819</td>
                            <td className="px-6 py-4 font-medium">David Chen</td>
                            <td className="px-6 py-4">Amazon AWS</td>
                            <td className="px-6 py-4 font-medium text-white">$450.00</td>
                            <td className="px-6 py-4"><span className="bg-yellow-500/10 text-yellow-400 px-2 py-1 rounded text-xs font-medium">Pending</span></td>
                            <td className="px-6 py-4 text-gray-400 text-sm">Oct 23, 2023</td>
                        </tr>
                        <tr className="hover:bg-gray-700/30 transition-colors">
                            <td className="px-6 py-4 text-sm font-mono text-gray-400">#TRX-9818</td>
                            <td className="px-6 py-4 font-medium">Emily Davis</td>
                            <td className="px-6 py-4">Starbucks</td>
                            <td className="px-6 py-4 font-medium text-white">$12.75</td>
                            <td className="px-6 py-4"><span className="bg-green-500/10 text-green-400 px-2 py-1 rounded text-xs font-medium">Completed</span></td>
                            <td className="px-6 py-4 text-gray-400 text-sm">Oct 23, 2023</td>
                        </tr>
                        <tr className="hover:bg-gray-700/30 transition-colors">
                            <td className="px-6 py-4 text-sm font-mono text-gray-400">#TRX-9817</td>
                            <td className="px-6 py-4 font-medium">Michael Wilson</td>
                            <td className="px-6 py-4">Best Buy</td>
                            <td className="px-6 py-4 font-medium text-white">$2,499.00</td>
                            <td className="px-6 py-4"><span className="bg-red-500/10 text-red-400 px-2 py-1 rounded text-xs font-medium">Declined</span></td>
                            <td className="px-6 py-4 text-gray-400 text-sm">Oct 22, 2023</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
