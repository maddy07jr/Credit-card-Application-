import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import DashboardLanding from './components/DashboardLanding';
import CardDashboard from './components/CardDashboard';

function App() {
  const [token, setToken] = useState<string | null>(null);

  const handleLogin = (token: string) => {
    setToken(token);
  };

  const handleLogout = () => {
    setToken(null);
  };

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={!token ? <Login onLogin={handleLogin} /> : <Navigate to="/dashboard" />} />
          <Route path="/dashboard" element={token ? <DashboardLanding onLogout={handleLogout} /> : <Navigate to="/" />} />
          <Route path="/card-details" element={token ? <CardDashboard onLogout={handleLogout} /> : <Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
