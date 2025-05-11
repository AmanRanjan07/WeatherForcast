import React from "react";
import "../styles/Auth.css";

const Register = () => {
  return (
    <div className="auth-container">
      <h1>Register</h1>
      <input type="text" placeholder="Username" />
      <input type="email" placeholder="Email" />
      <input type="password" placeholder="Password" />
      <button>Register</button>
    </div>
  );
};

export default Register;
