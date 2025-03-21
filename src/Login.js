import React, { useState } from "react";
import "./App.css";

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email === "zahrazinda@gmail.com" && password === "zinda1234") {
      onLogin();
    } else {
      alert("Invalid email or password!");
    }
  };

  return (
    <div className="login-container">
      <h2>Hey Zinda</h2>
      <form onSubmit={handleSubmit}>
        <input type="email" placeholder="zahrazinda@gmail.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder="zinda1234" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
