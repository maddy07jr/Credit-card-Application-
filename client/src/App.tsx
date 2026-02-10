import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import DashboardLanding from './components/DashboardLanding';
import CardDashboard from './components/CardDashboard';
import AdminLogin from './components/AdminLogin';
import AdminDashboard from './components/AdminDashboard';
import LandingPage from './components/LandingPage';
import UserManagement from './components/admin/UserManagement';
import TransactionLogs from './components/admin/TransactionLogs';
import SystemSettings from './components/admin/SystemSettings';
import PendingApprovals from './components/admin/PendingApprovals';
import CustomerTransactions from './components/customer/CustomerTransactions';
import PaymentPage from './components/customer/PaymentPage';
import ShoppingPage from './components/customer/ShoppingPage';
import RewardsPage from './components/customer/RewardsPage';
import CustomerSettings from './components/customer/CustomerSettings';

function App() {
  const [token, setToken] = useState<string | null>(null);
  const [adminToken, setAdminToken] = useState<string | null>(null);

  const handleLogin = (token: string) => {
    setToken(token);
  };

  const handleLogout = () => {
    setToken(null);
  };

  const handleAdminLogin = (token: string) => {
    setAdminToken(token);
  };

  const handleAdminLogout = () => {
    setAdminToken(null);
  };

  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Public Landing */}
          <Route path="/" element={<LandingPage />} />

          {/* User Routes */}
          <Route path="/login" element={!token ? <Login onLogin={handleLogin} /> : <Navigate to="/dashboard" />} />
          <Route path="/dashboard" element={token ? <DashboardLanding onLogout={handleLogout} /> : <Navigate to="/login" />} />
          <Route path="/card-details" element={token ? <CardDashboard onLogout={handleLogout} /> : <Navigate to="/login" />} />
          <Route path="/transactions" element={token ? <CustomerTransactions onLogout={handleLogout} /> : <Navigate to="/login" />} />
          <Route path="/payment" element={token ? <PaymentPage onLogout={handleLogout} /> : <Navigate to="/login" />} />
          <Route path="/shop" element={token ? <ShoppingPage onLogout={handleLogout} /> : <Navigate to="/login" />} />
          <Route path="/rewards" element={token ? <RewardsPage onLogout={handleLogout} /> : <Navigate to="/login" />} />
          <Route path="/settings" element={token ? <CustomerSettings onLogout={handleLogout} /> : <Navigate to="/login" />} />

          {/* Admin Routes */}
          <Route path="/admin" element={!adminToken ? <AdminLogin onLogin={handleAdminLogin} /> : <Navigate to="/admin/dashboard" />} />
          <Route path="/admin/dashboard" element={adminToken ? <AdminDashboard onLogout={handleAdminLogout} /> : <Navigate to="/admin" />} />
          <Route path="/admin/users" element={adminToken ? <UserManagement onLogout={handleAdminLogout} /> : <Navigate to="/admin" />} />
          <Route path="/admin/transactions" element={adminToken ? <TransactionLogs onLogout={handleAdminLogout} /> : <Navigate to="/admin" />} />
          <Route path="/admin/settings" element={adminToken ? <SystemSettings onLogout={handleAdminLogout} /> : <Navigate to="/admin" />} />
          <Route path="/admin/approvals" element={adminToken ? <PendingApprovals onLogout={handleAdminLogout} /> : <Navigate to="/admin" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
