import React, { useState } from 'react';
import '../style.css'; // Ensure the path is correct for your CSS file
import 'boxicons/css/boxicons.min.css';

function Login({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(username, password, remember);
  };

  return (
    <div className="box">
      <div className="container">
        <form onSubmit={handleSubmit}>
          <div className="top-header">
            <span>Have an account?</span>
            <header>Login</header>
          </div>

          <div className="input-field">
            <input
              type="text"
              className="input"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <i className="bx bx-user"></i>
          </div>

          <div className="input-field">
            <input
              type="password"
              className="input"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <i className="bx bx-lock-alt"></i>
          </div>

          <div className="input-field">
            <input type="submit" className="submit" value="Login" />
          </div>

          <div className="bottom">
            <div className="left">
              <input
                type="checkbox"
                id="check"
                checked={remember}
                onChange={() => setRemember(!remember)}
              />
              <label htmlFor="check"> Remember Me</label>
            </div>
            <div className="right">
              <label><a href="#">Forgot password?</a></label>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
