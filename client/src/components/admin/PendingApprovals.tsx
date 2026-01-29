import React from 'react';
import AdminLayout from '../AdminLayout';

interface PendingApprovalsProps {
  onLogout: () => void;
}

const PendingApprovals: React.FC<PendingApprovalsProps> = ({ onLogout }) => {
  const approvals = [
    { id: 101, name: 'John Doe', income: '$85,000', requestedLimit: '$10,000', score: 720 },
    { id: 102, name: 'Jane Smith', income: '$120,000', requestedLimit: '$20,000', score: 780 },
    { id: 103, name: 'Robert Brown', income: '$45,000', requestedLimit: '$5,000', score: 650 },
  ];

  return (
    <AdminLayout onLogout={onLogout} title="Pending Approvals">
      <div className="grid grid-cols-1 gap-6">
        {approvals.map((app) => (
            <div key={app.id} className="bg-gray-800 p-6 rounded-2xl border border-gray-700 flex justify-between items-center">
                <div>
                    <h3 className="text-lg font-bold text-white">{app.name}</h3>
                    <div className="flex gap-4 mt-2 text-sm text-gray-400">
                        <span>Income: {app.income}</span>
                        <span>Requested: {app.requestedLimit}</span>
                        <span>Credit Score: <span className="text-blue-400 font-bold">{app.score}</span></span>
                    </div>
                </div>
                <div className="flex gap-3">
                    <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
                        Approve
                    </button>
                    <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
                        Reject
                    </button>
                </div>
            </div>
        ))}
      </div>
    </AdminLayout>
  );
};

export default PendingApprovals;
