import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useAuth } from '../context/AuthContext';

type Todo = {
  id: number;
  text: string;
};

const Todos = () => {
  const [todoText, setTodoText] = useState('');
  const [todos, setTodos] = useState<Todo[]>([]);

  const { username, logout } = useAuth();
  const navigate = useNavigate();

  const handleAddTodo = () => {
    if (!todoText.trim()) return;

    const newTodo: Todo = {
      id: Date.now(),
      text: todoText,
    };

    setTodos((currentTodos) => [...currentTodos, newTodo]);
    setTodoText('');
  };

  const handleDeleteTodo = (id: number) => {
    setTodos((currentTodos) =>
      currentTodos.filter((todo) => todo.id !== id)
    );
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="mx-auto max-w-xl p-8">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold">Hello, {username}</h1>

        <button
          onClick={handleLogout}
          className="rounded-xl bg-red-500 px-4 py-2 text-white"
        >
          Logout
        </button>
      </div>

      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Add a todo"
          className="flex-1 rounded-xl border p-3 text-black"
          value={todoText}
          onChange={(e) => setTodoText(e.target.value)}
        />

        <button
          onClick={handleAddTodo}
          className="rounded-xl bg-green-600 px-4 py-2 text-white"
        >
          Add
        </button>
      </div>

      <ul className="mt-6 space-y-3">
        {todos.map((todo) => (
          <li
            key={todo.id}
            className="flex items-center justify-between rounded-xl bg-white p-4 text-black shadow"
          >
            <span>{todo.text}</span>

            <button
              onClick={() => handleDeleteTodo(todo.id)}
              className="rounded-lg bg-red-500 px-3 py-1 text-white"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Todos;