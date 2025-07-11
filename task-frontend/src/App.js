import React, { useState, useEffect } from 'react';
import TaskList from './components/TaskList';
import AddTask from './components/AddTask';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    
    const isLoggedIn = localStorage.getItem('loggedIn') === 'true';
    setLoggedIn(isLoggedIn);
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    if (email === 'admin@gmail.com' && password === 'admin') {
      localStorage.setItem('loggedIn', 'true');
      setLoggedIn(true);
    } else {
      alert('Invalid credentials');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('loggedIn');
    setLoggedIn(false);
  };

  const triggerRefresh = () => {
    setRefresh(!refresh);
  };

  return (
    <div className="container mt-5">
      {!loggedIn ? (
        <div className="w-50 mx-auto">
          <h3 className="text-center mb-4">Login</h3>
          <form onSubmit={handleLogin}>
            <div className="mb-3">
              <input
                type="email"
                className="form-control"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <input
                type="password"
                className="form-control"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button className="btn btn-primary w-100">Login</button>
          </form>
        </div>
      ) : (
        <div>
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2 className="text-center">Task Manager</h2>
            <button className="btn btn-outline-danger" onClick={handleLogout}>Logout</button>
          </div>
          <AddTask onAdd={triggerRefresh} />
          <TaskList refresh={refresh} />
        </div>
      )}
    </div>
  );
}

export default App;
