import React from 'react';
import AdminLayout from '../AdminLayout';

interface SystemSettingsProps {
  onLogout: () => void;
}

const SystemSettings: React.FC<SystemSettingsProps> = ({ onLogout }) => {
  return (
    <AdminLayout onLogout={onLogout} title="System Settings">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-gray-800 p-6 rounded-2xl border border-gray-700">
            <h3 className="text-xl font-bold mb-4">General Configuration</h3>
            <div className="space-y-4">
                <div className="flex justify-between items-center">
                    <span className="text-gray-400">Maintenance Mode</span>
                    <div className="w-12 h-6 bg-gray-700 rounded-full relative cursor-pointer">
                        <div className="w-4 h-4 bg-gray-400 rounded-full absolute top-1 left-1"></div>
                    </div>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-gray-400">New User Registration</span>
                    <div className="w-12 h-6 bg-green-500/20 rounded-full relative cursor-pointer">
                        <div className="w-4 h-4 bg-green-500 rounded-full absolute top-1 right-1"></div>
                    </div>
                </div>
            </div>
        </div>

        <div className="bg-gray-800 p-6 rounded-2xl border border-gray-700">
            <h3 className="text-xl font-bold mb-4">Financial Settings</h3>
            <div className="space-y-4">
                <div>
                    <label className="block text-gray-400 text-sm mb-1">Base Interest Rate (%)</label>
                    <input type="number" defaultValue="15.5" className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white" />
                </div>
                <div>
                    <label className="block text-gray-400 text-sm mb-1">Default Credit Limit ($)</label>
                    <input type="number" defaultValue="5000" className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white" />
                </div>
            </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default SystemSettings;
