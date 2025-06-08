import React, { useState, useEffect } from "react";

const AdminDashboard = () => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    setStudents(users);
  }, []);

  const updateStatus = (index, status) => {
    const updated = [...students];
    updated[index].status = status;
    setStudents(updated);
    localStorage.setItem("users", JSON.stringify(updated));
  };

  return (
    <div className="container">
      <h2>Student Applications</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {students.map((stu, idx) => (
            <tr key={idx}>
              <td>{stu.name}</td>
              <td>{stu.email}</td>
              <td>{stu.status || "pending"}</td>
              <td>
                <button onClick={() => updateStatus(idx, "accepted")}>Accept</button>
                <button onClick={() => updateStatus(idx, "denied")}>Deny</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminDashboard;
