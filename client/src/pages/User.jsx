import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUser, loginUser, checkAdmin } from '../api/users';
import '../css/Users.css';

function User({ setToken, setUser, setAdmin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState('');
  const [inputSecretKey, setInputSecretKey] = useState('');
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const data = await createUser(username, password);
      if (data && data.token) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('userId', data.user.id);
        setToken(data.token);
        setUser(data.user);
        setUsername('');
        setPassword('');
        alert('Register Success!');
        if (userType === 'Admin') {
          setInputSecretKey("12345!"); // secret key is here
          setIsAdmin(true);
          alert('Admin Register Success!');
        }
      } else {
        console.error('Failed to create user');
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const userData = await loginUser(username, password);
      console.log(userData);
      if (userData && userData.token) {
        localStorage.setItem('token', userData.token);
        localStorage.setItem('userId', userData.user.id);
        setToken(userData.token);
        setUser(userData.user);
        setUsername('');
        setPassword('');
        alert('Login Success! Welcome to SHOENSTAR!');
        if (userType === 'Admin') {
          const isAdmin = await checkAdmin('12345!');
          if (isAdmin) {
            localStorage.setItem('isAdmin', true);
            alert('Admin Code Authentication');
          } else {
            alert('Invalid Admin');
          }
        }
      } else {
        console.error('Invalid username or password');
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('admin');
    setToken('');
    setUser(null);
    setAdmin(false);
  };

  return (
    <div className="User">
      <div className="card">
        <h1>Sign in</h1>
        <form onSubmit={handleRegister}>
          <div className="input-group">
            <div>
              Register As
              <input
                type="radio"
                name="UserType"
                value="User"
                onChange={(e) => setUserType(e.target.value)}
              />
              User
              <input
                type="radio"
                name="UserType"
                value="Admin"
                onChange={(e) => setUserType(e.target.value)}
              />
              Admin
            </div>
            {userType === 'Admin' && (
              <div className="mb-3">
                <label>Secret Key</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Secret Key"
                  value={inputSecretKey}
                  onChange={(e) => setInputSecretKey(e.target.value)}
                />
              </div>
            )}

            <label htmlFor="username">Username</label>
            <input
              id="username"
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit">Register</button>
        </form>
        <form onSubmit={handleLogin}>
          <button type="submit">Login</button>
        </form>
        <button onClick={handleLogout}>Logout</button>
      </div>
      {isAdmin && <p>Admin logged in</p>}
    </div>
  );
}

export default User;