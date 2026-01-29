import React, { useState } from 'react';

interface LoginProps {
  onLogin: (token: string) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch('http://localhost:3001/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (data.success) {
        onLogin(data.token);
      } else {
        setError(data.message || 'Login failed');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-4xl w-full flex rounded-2xl shadow-2xl overflow-hidden bg-white">
        {/* Left Side - Image/Branding */}
        <div className="hidden md:flex md:w-1/2 bg-[#0a192f] items-center justify-center p-12 relative overflow-hidden">
           <div className="absolute w-64 h-64 bg-[#112240] rounded-full -top-12 -left-12 opacity-50"></div>
           <div className="absolute w-32 h-32 bg-[#ffd700] rounded-full bottom-12 right-12 opacity-10"></div>
           <div className="relative z-10 text-center">
              <h1 className="text-4xl font-bold text-white mb-4">PMBanking</h1>
              <p className="text-[#8892b0]">Secure. Professional. Reliable.</p>
           </div>
        </div>

        {/* Right Side - Form */}
        <div className="w-full md:w-1/2 p-12">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-[#0a192f]">Welcome Back</h2>
            <p className="text-gray-500 mt-2">Please enter your details to sign in.</p>
          </div>
          
          {error && <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded-r" role="alert">{error}</div>}
          
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="username">
                Username
              </label>
              <input
                className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-300 focus:border-[#0a192f] focus:bg-white focus:outline-none transition-colors"
                id="username"
                type="text"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="mb-8">
              <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="password">
                Password
              </label>
              <input
                className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-300 focus:border-[#0a192f] focus:bg-white focus:outline-none transition-colors"
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button
              className="w-full bg-[#0a192f] hover:bg-[#112240] text-white font-bold py-3 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0a192f] transition-all transform active:scale-[0.98]"
              type="submit"
            >
              Sign In
            </button>
            <div className="mt-6 text-center">
              <a href="#" className="text-sm text-[#0a192f] hover:underline">Forgot password?</a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
