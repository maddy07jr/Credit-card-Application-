import React from 'react';
import CustomerLayout from '../CustomerLayout';

interface CustomerSettingsProps {
  onLogout: () => void;
}

const CustomerSettings: React.FC<CustomerSettingsProps> = ({ onLogout }) => {
  return (
    <CustomerLayout onLogout={onLogout} title="Account Settings">
      <div className="max-w-3xl">
        <div className="bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden mb-8">
            <div className="p-8 border-b border-gray-100">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Profile Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-gray-500 text-sm font-medium mb-2">Full Name</label>
                        <input type="text" defaultValue="Manick Sriram M" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900" />
                    </div>
                    <div>
                        <label className="block text-gray-500 text-sm font-medium mb-2">Email Address</label>
                        <input type="email" defaultValue="manick@example.com" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900" />
                    </div>
                    <div>
                        <label className="block text-gray-500 text-sm font-medium mb-2">Phone Number</label>
                        <input type="tel" defaultValue="+1 (555) 123-4567" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900" />
                    </div>
                </div>
            </div>
            <div className="p-8 bg-gray-50 flex justify-end">
                <button className="bg-blue-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-blue-700 transition-colors">
                    Save Changes
                </button>
            </div>
        </div>

        <div className="bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden">
            <div className="p-8">
                <h3 className="text-lg font-bold text-gray-900 mb-6">Preferences</h3>
                <div className="space-y-6">
                    <div className="flex justify-between items-center">
                        <div>
                            <h4 className="font-medium text-gray-900">Email Notifications</h4>
                            <p className="text-sm text-gray-500">Receive updates about your account activity</p>
                        </div>
                        <div className="w-12 h-6 bg-green-500 rounded-full relative cursor-pointer">
                            <div className="w-4 h-4 bg-white rounded-full absolute top-1 right-1 shadow-sm"></div>
                        </div>
                    </div>
                    <div className="flex justify-between items-center">
                        <div>
                            <h4 className="font-medium text-gray-900">SMS Alerts</h4>
                            <p className="text-sm text-gray-500">Get instant alerts for transactions over $100</p>
                        </div>
                        <div className="w-12 h-6 bg-gray-200 rounded-full relative cursor-pointer">
                            <div className="w-4 h-4 bg-white rounded-full absolute top-1 left-1 shadow-sm"></div>
                        </div>
                    </div>
                    <div className="flex justify-between items-center">
                        <div>
                            <h4 className="font-medium text-gray-900">Dark Mode</h4>
                            <p className="text-sm text-gray-500">Switch between light and dark themes</p>
                        </div>
                        <div className="w-12 h-6 bg-gray-200 rounded-full relative cursor-pointer">
                            <div className="w-4 h-4 bg-white rounded-full absolute top-1 left-1 shadow-sm"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </CustomerLayout>
  );
};

export default CustomerSettings;
