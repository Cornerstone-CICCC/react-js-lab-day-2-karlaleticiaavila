import { Navigate, Route, Routes } from 'react-router';
import Home from './pages/Home';
import Todos from './pages/Todos';
import { useAuth } from './context/AuthContext';

const App = () => {
  const { isLoggedIn, isDarkMode, toggleTheme } = useAuth();

  return (
    <div
      className={
        isDarkMode
          ? 'min-h-screen bg-slate-950 text-white'
          : 'min-h-screen bg-pink-100 text-slate-900'
      }
    >
      <button
        onClick={toggleTheme}
        className="m-4 rounded-xl bg-purple-600 px-4 py-2 text-white"
      >
        Toggle Theme
      </button>

      <Routes>
        <Route path="/" element={<Home />} />

        <Route
          path="/todos"
          element={isLoggedIn ? <Todos /> : <Navigate to="/" />}
        />
      </Routes>
    </div>
  );
};

export default App;