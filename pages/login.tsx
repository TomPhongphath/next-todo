import { useState } from 'react';
import { useRouter } from 'next/router';
import withUnAuth from '@/hoc/withUnAunth';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    if (res.ok) {
      const token = await res.json();
      localStorage.setItem('token', token.token);
      router.push('/todo');
    } else {
      alert('Login failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-xs">
        <div className="flex justify-center items-center">
          <img
            src="https://scontent.fkkc2-1.fna.fbcdn.net/v/t1.6435-9/134091691_2797904010484571_487725024733822038_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=1d70fc&_nc_ohc=LyUeSD2oSAoQ7kNvgGYR1jD&_nc_ht=scontent.fkkc2-1.fna&oh=00_AYDybeGtNfM_q39ZpjbBoTmOf_ixXKPm8iX-BXzfjUc72g&oe=66BEDB82"
            alt="DJ_SuperStar"
            className="w-28 rounded-lg shadow-lg"
          />
        </div>
        <label className="block text-gray-700 text-xl font-bold mb-2 text-center" htmlFor="username">
          Login
        </label>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
            Username
          </label>
          <input
            id="username"
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
            Password
          </label>
          <input
            id="password"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Login
          </button>
        </div>
      </form>
    </div>
  );
}

export default withUnAuth(Login);