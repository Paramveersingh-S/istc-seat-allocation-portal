import React, { useState } from "react";

const branches = [
  "Mechanical (Tool and Die)",
  "Mechanical 4 Years (Die and Mould)",
  "Electronics 3 Years",
  "Mechatronics 4 Years",
];

const quotas = [
  "General",
  "SC",
  "ST",
  "OBC",
  "EWS",
  "PwD",
];

const Register = () => {
  const [form, setForm] = useState({
    name: "",
    fatherName: "",
    motherName: "",
    aadhaar: "",
    perc10: "",
    perc12: "",
    quota: "",
    branch1: "",
    branch2: "",
    branch3: "",
    branch4: "",
    board: "",
    state: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Aadhaar validation
    if (!/^\d{12}$/.test(form.aadhaar)) {
      alert("Please enter a valid 12-digit Aadhaar number.");
      return;
    }

    // Unique branch preferences
    const prefs = [form.branch1, form.branch2, form.branch3, form.branch4];
    const uniquePrefs = new Set(prefs);
    if (prefs.includes("") || uniquePrefs.size !== 4) {
      alert("Each branch preference must be unique and selected.");
      return;
    }

    // Email validation
    if (!/\S+@\S+\.\S+/.test(form.email)) {
      alert("Please enter a valid email address.");
      return;
    }

    // Password validation (min 6 chars)
    if (form.password.length < 6) {
      alert("Password must be at least 6 characters.");
      return;
    }

    // Check if email already exists
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    if (users.find((u) => u.email === form.email)) {
      alert("This email is already registered.");
      return;
    }

    // Save user (for demo: save all form fields except password in plain text)
    users.push(form);
    localStorage.setItem("users", JSON.stringify(users));
    alert("Registration successful! You can now log in.");
    setForm({
      name: "",
      fatherName: "",
      motherName: "",
      aadhaar: "",
      perc10: "",
      perc12: "",
      quota: "",
      branch1: "",
      branch2: "",
      branch3: "",
      branch4: "",
      board: "",
      state: "",
      email: "",
      password: "",
    });
  };

  return (
    <div className="container">
      <style>{`
        @import url('https://fonts.googleapis.com/css?family=Roboto:700,400');
        .container {
          max-width: 600px;
          margin: 40px auto;
          background: #fff;
          border-radius: 8px;
          box-shadow: 0 4px 16px rgba(27,42,71,0.08);
          padding: 32px 40px;
          font-family: 'Roboto', Arial, sans-serif;
        }
        h2 {
          text-align: center;
          color: #0b6fa4;
          font-weight: 700;
          margin-bottom: 24px;
        }
        label {
          display: block;
          margin-top: 16px;
          font-weight: 500;
        }
        input, select {
          width: 100%;
          padding: 8px 10px;
          margin-top: 4px;
          border: 1px solid #cfd8dc;
          border-radius: 4px;
          font-size: 16px;
        }
        .branch-preference {
          display: flex;
          gap: 10px;
          margin-top: 8px;
        }
        .branch-preference select {
          flex: 1;
        }
        button {
          background: #0b6fa4;
          color: #fff;
          border: none;
          padding: 12px 0;
          border-radius: 4px;
          font-size: 18px;
          font-weight: 700;
          width: 100%;
          margin-top: 28px;
          cursor: pointer;
          transition: background 0.2s;
        }
        button:hover {
          background: #095a85;
        }
        .note {
          font-size: 13px;
          color: #888;
          margin-top: 6px;
        }
      `}</style>
      <h2>Student Registration for Counselling</h2>
      <form onSubmit={handleSubmit} autoComplete="off">
        <label htmlFor="email">Email Address</label>
        <input
          type="email"
          id="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          required
        />

        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          minLength={6}
          required
        />
        <span className="note">Password must be at least 6 characters.</span>

        <label htmlFor="name">Full Name</label>
        <input
          type="text"
          id="name"
          name="name"
          value={form.name}
          onChange={handleChange}
          required
        />

        <label htmlFor="fatherName">Father's Name</label>
        <input
          type="text"
          id="fatherName"
          name="fatherName"
          value={form.fatherName}
          onChange={handleChange}
          required
        />

        <label htmlFor="motherName">Mother's Name</label>
        <input
          type="text"
          id="motherName"
          name="motherName"
          value={form.motherName}
          onChange={handleChange}
          required
        />

        <label htmlFor="aadhaar">Aadhaar ID</label>
        <input
          type="text"
          id="aadhaar"
          name="aadhaar"
          value={form.aadhaar}
          onChange={handleChange}
          maxLength={12}
          pattern="\d{12}"
          required
        />
        <span className="note">Enter 12-digit Aadhaar Number</span>

        <label htmlFor="perc10">10th Percentage</label>
        <input
          type="number"
          id="perc10"
          name="perc10"
          value={form.perc10}
          onChange={handleChange}
          min={0}
          max={100}
          step="0.01"
          required
        />

        <label htmlFor="perc12">12th Percentage</label>
        <input
          type="number"
          id="perc12"
          name="perc12"
          value={form.perc12}
          onChange={handleChange}
          min={0}
          max={100}
          step="0.01"
          required
        />

        <label htmlFor="quota">Quota</label>
        <select
          id="quota"
          name="quota"
          value={form.quota}
          onChange={handleChange}
          required
        >
          <option value="">--Select--</option>
          {quotas.map((q) => (
            <option key={q} value={q}>{q}</option>
          ))}
        </select>

        <label>Branch Preferences (1st to 4th)</label>
        <div className="branch-preference">
          {[1, 2].map((num) => (
            <select
              key={num}
              name={`branch${num}`}
              value={form[`branch${num}`]}
              onChange={handleChange}
              required
            >
              <option value="">{`${num}st Preference`}</option>
              {branches.map((b) => (
                <option key={b} value={b}>{b}</option>
              ))}
            </select>
          ))}
        </div>
        <div className="branch-preference">
          {[3, 4].map((num) => (
            <select
              key={num}
              name={`branch${num}`}
              value={form[`branch${num}`]}
              onChange={handleChange}
              required
            >
              <option value="">{`${num}th Preference`}</option>
              {branches.map((b) => (
                <option key={b} value={b}>{b}</option>
              ))}
            </select>
          ))}
        </div>
        <span className="note">Each preference must be unique.</span>

        <label htmlFor="board">Board</label>
        <input
          type="text"
          id="board"
          name="board"
          value={form.board}
          onChange={handleChange}
          required
        />

        <label htmlFor="state">State</label>
        <input
          type="text"
          id="state"
          name="state"
          value={form.state}
          onChange={handleChange}
          required
        />

        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
