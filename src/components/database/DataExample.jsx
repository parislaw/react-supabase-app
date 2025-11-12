import React, { useState, useEffect } from 'react';
import { supabase } from '../../supabase/client';
import { useUser } from '../auth/AuthProvider';

// Example CRUD component for a "todos" table
export const DataExample = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const user = useUser();

  // Fetch todos on component mount
  useEffect(() => {
    if (user) {
      fetchTodos();
    }
  }, [user]);

  // READ: Fetch all todos for current user
  const fetchTodos = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('todos')
      .select('*')
      .eq('user_id', user.id)
      .order('inserted_at', { ascending: false });

    if (error) {
      setError('Error fetching todos: ' + error.message);
    } else {
      setTodos(data || []);
    }
    setLoading(false);
  };

  // CREATE: Add a new todo
  const addTodo = async (e) => {
    e.preventDefault();
    if (!newTodo.trim()) return;

    setLoading(true);
    const { data, error } = await supabase
      .from('todos')
      .insert([{ task: newTodo, user_id: user.id }])
      .select();

    if (error) {
      setError('Error adding todo: ' + error.message);
    } else {
      setTodos([data[0], ...todos]);
      setNewTodo('');
    }
    setLoading(false);
  };

  // UPDATE: Toggle todo completion status
  const toggleTodo = async (id, currentStatus) => {
    const { error } = await supabase
      .from('todos')
      .update({ is_complete: !currentStatus })
      .eq('id', id);

    if (error) {
      setError('Error updating todo: ' + error.message);
    } else {
      setTodos(
        todos.map((todo) =>
          todo.id === id ? { ...todo, is_complete: !currentStatus } : todo
        )
      );
    }
  };

  // DELETE: Remove a todo
  const deleteTodo = async (id) => {
    const { error } = await supabase.from('todos').delete().eq('id', id);

    if (error) {
      setError('Error deleting todo: ' + error.message);
    } else {
      setTodos(todos.filter((todo) => todo.id !== id));
    }
  };

  return (
    <div className="data-example-container">
      <h2>My Todos</h2>

      {error && <div className="error-message">{error}</div>}

      <form onSubmit={addTodo} className="add-todo-form">
        <input
          type="text"
          placeholder="Enter a new todo..."
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          disabled={loading}
        />
        <button type="submit" disabled={loading}>
          Add Todo
        </button>
      </form>

      {loading && <p>Loading...</p>}

      <div className="todos-list">
        {todos.length === 0 ? (
          <p>No todos yet. Add one above!</p>
        ) : (
          todos.map((todo) => (
            <div key={todo.id} className="todo-item">
              <input
                type="checkbox"
                checked={todo.is_complete}
                onChange={() => toggleTodo(todo.id, todo.is_complete)}
              />
              <span className={todo.is_complete ? 'completed' : ''}>
                {todo.task}
              </span>
              <button onClick={() => deleteTodo(todo.id)}>Delete</button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
