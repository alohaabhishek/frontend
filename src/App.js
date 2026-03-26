import { useEffect, useState } from "react";
import { getUsers, createUser } from "./services/user.service";

function App() {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({
    name: "",
    email: "",
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const data = await getUsers();
    setUsers(data);
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.email) {
      alert("All fields are required");
      return;
    }

    try {
      await createUser(form);
      setForm({ name: "", email: "" });
      fetchUsers(); // refresh list
    } catch (err) {
      alert("Error creating user");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>User Management</h1>

      {/* ✅ Form */}
      <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
        <input
          type="text"
          name="name"
          placeholder="Enter name"
          value={form.name}
          onChange={handleChange}
          style={{ marginRight: "10px" }}
        />

        <input
          type="email"
          name="email"
          placeholder="Enter email"
          value={form.email}
          onChange={handleChange}
          style={{ marginRight: "10px" }}
        />

        <button type="submit">Add User</button>
      </form>

      {/* ✅ Table */}
      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
          </tr>
        </thead>

        <tbody>
          {users.length > 0 ? (
            users.map((u) => (
              <tr key={u.id}>
                <td>{u.id}</td>
                <td>{u.name}</td>
                <td>{u.email}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3">No Users Found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default App;