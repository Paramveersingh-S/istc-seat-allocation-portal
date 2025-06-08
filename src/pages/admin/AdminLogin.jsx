import React, { useState } from "react";

const AdminLogin = ({ onLogin }) => {
  const [form, setForm] = useState({ email: "", password: "" });

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = e => {
    e.preventDefault();
    const admins = JSON.parse(localStorage.getItem("admins") || "[]");
    const admin = admins.find(a => a.email === form.email && a.password === form.password);
    if (admin) {
      onLogin();
    } else {
      alert("Invalid admin credentials.");
    }
  };

  return (
    <div className="container">
      <h2>Admin Login</h2>
      <form onSubmit={handleSubmit}>
        <label>Email</label>
        <input type="email" name="email" value={form.email} onChange={handleChange} required />
        <label>Password</label>
        <input type="password" name="password" value={form.password} onChange={handleChange} required />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default AdminLogin;
