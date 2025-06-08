import React, { useState } from "react";

const AdminRegister = () => {
  const [form, setForm] = useState({ email: "", password: "" });

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = e => {
    e.preventDefault();
    const admins = JSON.parse(localStorage.getItem("admins") || "[]");
    if (admins.find(a => a.email === form.email)) {
      alert("Admin already exists with this email.");
      return;
    }
    admins.push(form);
    localStorage.setItem("admins", JSON.stringify(admins));
    alert("Admin registration successful! You can now log in.");
    setForm({ email: "", password: "" });
  };

  return (
    <div className="container">
      <h2>Admin Registration</h2>
      <form onSubmit={handleSubmit}>
        <label>Email</label>
        <input type="email" name="email" value={form.email} onChange={handleChange} required />
        <label>Password</label>
        <input type="password" name="password" value={form.password} onChange={handleChange} required />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default AdminRegister;
