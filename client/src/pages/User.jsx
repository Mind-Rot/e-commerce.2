import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUser, loginUser } from '../api/users';
import '../css/Users.css';


function User({ setToken, setUser, setAdmin }) {  // added setAdmin
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState("");
  const [secretKey, setSecretKey] = useState("");
  const navigate = useNavigate();

  const adminLogin = async (e) => { // Add async keyword
    e.preventDefault();

    try {
      const isAdmin = await checkAdmin();

      if (secretKey !== "12345!") { //secret key here
        alert("Invalid Admin");
      } else {
        setAdmin(true);
        localStorage.setItem('admin', true);
        alert("Admin Code Authentication");
      }
    } catch (error) {
      console.error(error);
      alert("Error: Failed to authenticate admin")
    }
  };
  const register = async () => {
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
      } else {
        console.error('Failed to create user');
      }
    } catch (err) {
      console.error(err);
    }
  };

  const login = async () => {
    try {
      const data = await loginUser(username, password);
      console.log(data);
      if (data && data.token) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('userId', data.user.id);
        setToken(data.token);
        setUser(data.user); 
        setUsername('');
        setPassword('');
        alert('Login Success! Welcome to SHOENSTAR!');
        
        if (userType === "Admin") {
          adminLogin();
        }
    
      }else {
        console.error('Invalid username or password');
      }
    } catch (err) {
      console.error(err);
    }
  };


  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('admin');  // remove admin status
    setToken('');
    setUser(null);
    setAdmin(false);  // reset admin status
  };

  return (
<div className="User">
  <div className="card">
    <h1>Sign in</h1>
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
          {userType == "Admin" ? (
            <div className="mb-3">
              <label>Secret Key</label>
              <input
                type="text"
                className="form-control"
                placeholder="Secret Key"
                onChange={(e) => setSecretKey(e.target.value)}
              />
            </div>
          ) : null}
          
      <label htmlFor="username">Username</label>
      <input id="username" type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
    </div>
    <div className="input-group">
      <label htmlFor="password">Password</label>
      <input id="password" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
    </div>
    <button onClick={register}>Register</button>
    <button onClick={login}>Login</button>
    <button onClick={logout}>Logout</button>
  </div>
</div>
  );
}

export default User;