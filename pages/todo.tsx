import { useEffect, useState } from 'react';
import withAuth from '@/hoc/withAuth';
import { useRouter } from 'next/router';

interface Todo {
  _id: string;
  task: string;
}

function Todos() {
  const router = useRouter();
  const [todos, setTodos] = useState<Todo[]>([]);
  const [task, setTask] = useState('');
  const [editTodo, setEditTodo] = useState<Todo | null>(null);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No token found');
      }
      const res = await fetch('/api/todos', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      if (!res.ok) {
        throw new Error('Failed to fetch todos');
      }

      const data: Todo[] = await res.json();
      setTodos(data);
    } catch (error) {
      console.error('Error fetching todos:', error);
    }
  };

  const handleAddTodo = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No token found');
      }
      const res = await fetch('/api/todos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ task }),
      });

      if (res.ok) {
        fetchTodos();
        setTask('');
      } else {
        throw new Error('Failed to add task');
      }
    } catch (error) {
      console.error('Error adding todo:', error);
    }
  };

  const handleDeleteTodo = async (id: string) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No token found');
      }
      const res = await fetch(`/api/todos/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.ok) {
        fetchTodos();
      } else {
        throw new Error('Failed to delete task');
      }
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  const handleEditTodo = (todo: Todo) => {
    setEditTodo(todo);
  };

  const handleUpdateTodo = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!editTodo) return;

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No token found');
      }
      const res = await fetch(`/api/todos/${editTodo._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ task: editTodo.task }),
      });

      if (res.ok) {
        fetchTodos();
        setEditTodo(null);
      } else {
        throw new Error('Failed to update task');
      }
    } catch (error) {
      console.error('Error updating todo:', error);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    router.push('/');
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="fixed top-0 right-0 m-4">
        <button onClick={logout} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Logout
        </button>
      </div>
      <div className="max-w-4xl w-full mx-auto px-4 py-8 bg-white shadow-lg rounded-lg">
        <div className="flex justify-center items-center">
          <img
            src="https://scontent.fkkc2-1.fna.fbcdn.net/v/t1.6435-9/134091691_2797904010484571_487725024733822038_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=1d70fc&_nc_ohc=LyUeSD2oSAoQ7kNvgGYR1jD&_nc_ht=scontent.fkkc2-1.fna&oh=00_AYDybeGtNfM_q39ZpjbBoTmOf_ixXKPm8iX-BXzfjUc72g&oe=66BEDB82"
            alt="DJ_SuperStar"
            className="w-28 rounded-lg shadow-lg"
          />
        </div>
        <div className="mb-4 text-3xl text-center">
          Todo List
        </div>
        <form onSubmit={handleAddTodo} className="mb-4 flex">
          <input
            type="text"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            placeholder="New task"
            className="border border-gray-300 p-2 rounded mr-2 flex-1"
          />
          <button type="submit" className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
            Add
          </button>
        </form>
        <ul>
          {todos.map((todo) => (
            <div key={todo._id} >
              {editTodo && editTodo._id === todo._id ? (
                <form onSubmit={handleUpdateTodo} className="flex mb-2">
                  <input
                    type="text"
                    value={editTodo.task}
                    onChange={(e) => setEditTodo({ ...editTodo, task: e.target.value })}
                    className="border border-gray-300 p-2 rounded mr-2 flex-1"
                  />
                  <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Save
                  </button>
                  <button
                    type="button"
                    onClick={() => setEditTodo(null)}
                    className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded ml-2"
                  >
                    Cancel
                  </button>
                </form>
              ) : (
                <div className="mb-2 flex items-center justify-between">
                  <span className="border border-gray-300 p-2 rounded mr-2 flex-1">{todo.task}</span>
                  <button onClick={() => handleEditTodo(todo)} className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded">
                    Edit
                  </button>
                  <button onClick={() => handleDeleteTodo(todo._id)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ml-2">
                    Delete
                  </button>
                </div>
              )}
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default withAuth(Todos);
