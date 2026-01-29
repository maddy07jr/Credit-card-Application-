import { useState } from 'react';
import Login from './components/Login';
import CreditCard from './components/CreditCard';

function App() {
  const [token, setToken] = useState<string | null>(null);

  const handleLogin = (token: string) => {
    setToken(token);
  };

  return (
    <div className="App">
      {!token ? (
        <Login onLogin={handleLogin} />
      ) : (
        <CreditCard />
      )}
    </div>
  );
}

export default App;
