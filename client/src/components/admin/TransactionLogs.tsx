import React from 'react';
import AdminLayout from '../AdminLayout';

interface TransactionLogsProps {
  onLogout: () => void;
}

const TransactionLogs: React.FC<TransactionLogsProps> = ({ onLogout }) => {
  return (
    <AdminLayout onLogout={onLogout} title="Transaction Logs">
      <div className="bg-gray-800 rounded-2xl border border-gray-700 p-6 mb-6">
        <div className="flex gap-4">
            <input 
                type="text" 
                placeholder="Search by Transaction ID or User..." 
                className="flex-1 bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500"
            />
            <select className="bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500">
                <option>All Statuses</option>
                <option>Completed</option>
                <option>Pending</option>
                <option>Declined</option>
            </select>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors">
                Filter
            </button>
        </div>
      </div>

      <div className="bg-gray-800 rounded-2xl border border-gray-700 overflow-hidden">
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
                            <td className="px-6 py-4 font-medium">Priyanka</td>
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
                        {/* More mock rows... */}
                        <tr className="hover:bg-gray-700/30 transition-colors">
                            <td className="px-6 py-4 text-sm font-mono text-gray-400">#TRX-9819</td>
                            <td className="px-6 py-4 font-medium">David Chen</td>
                            <td className="px-6 py-4">Amazon AWS</td>
                            <td className="px-6 py-4 font-medium text-white">$450.00</td>
                            <td className="px-6 py-4"><span className="bg-yellow-500/10 text-yellow-400 px-2 py-1 rounded text-xs font-medium">Pending</span></td>
                            <td className="px-6 py-4 text-gray-400 text-sm">Oct 23, 2023</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </AdminLayout>
  );
};

export default TransactionLogs;
