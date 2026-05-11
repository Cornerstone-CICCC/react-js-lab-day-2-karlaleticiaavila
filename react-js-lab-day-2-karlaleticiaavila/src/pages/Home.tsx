import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useAuth } from '../context/AuthContext';

const Home = () => {
  const [name, setName] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = () => {
    if (!name.trim()) return;

    login(name);
    navigate('/todos');
  };

  return (
    <div className="mx-auto flex max-w-md flex-col items-center gap-4 p-8">
      <h1 className="text-4xl font-bold">Welcome</h1>

      <input
        type="text"
        placeholder="Enter your name"
        className="w-full rounded-xl border p-3 text-black"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <button
        onClick={handleLogin}
        className="w-full rounded-xl bg-pink-600 px-4 py-3 font-bold text-white"
      >
        Login
      </button>
    </div>
  );
};

export default Home;