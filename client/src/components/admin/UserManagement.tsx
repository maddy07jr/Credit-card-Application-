import React from 'react';
import AdminLayout from '../AdminLayout';

interface UserManagementProps {
  onLogout: () => void;
}

const UserManagement: React.FC<UserManagementProps> = ({ onLogout }) => {
  const users = [
    { id: 1, name: 'Priyanka', email: 'Priyanka@example.com', status: 'Active', joined: 'Oct 2023' },
    { id: 2, name: 'Sarah Johnson', email: 'sarah@example.com', status: 'Active', joined: 'Sep 2023' },
    { id: 3, name: 'David Chen', email: 'david@example.com', status: 'Blocked', joined: 'Aug 2023' },
    { id: 4, name: 'Emily Davis', email: 'emily@example.com', status: 'Active', joined: 'Nov 2023' },
    { id: 5, name: 'Michael Wilson', email: 'michael@example.com', status: 'Inactive', joined: 'Jul 2023' },
  ];

  return (
    <AdminLayout onLogout={onLogout} title="User Management">
      <div className="bg-gray-800 rounded-2xl border border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-700/50 text-gray-400 text-sm uppercase">
              <tr>
                <th className="px-6 py-4 font-medium">User ID</th>
                <th className="px-6 py-4 font-medium">Name</th>
                <th className="px-6 py-4 font-medium">Email</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium">Joined</th>
                <th className="px-6 py-4 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-gray-700/30 transition-colors">
                  <td className="px-6 py-4 text-sm font-mono text-gray-400">#{user.id}</td>
                  <td className="px-6 py-4 font-medium">{user.name}</td>
                  <td className="px-6 py-4 text-gray-400">{user.email}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      user.status === 'Active' ? 'bg-green-500/10 text-green-400' :
                      user.status === 'Blocked' ? 'bg-red-500/10 text-red-400' :
                      'bg-gray-500/10 text-gray-400'
                    }`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-400 text-sm">{user.joined}</td>
                  <td className="px-6 py-4">
                    <button className="text-blue-400 hover:text-blue-300 mr-3">Edit</button>
                    <button className="text-red-400 hover:text-red-300">Block</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
};

export default UserManagement;
