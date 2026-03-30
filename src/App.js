import { useEffect, useState } from "react";
import {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
} from "./services/user.service";

function App() {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({ name: "", email: "" });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editUser, setEditUser] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const data = await getUsers();
    setUsers(data);
  };

  // CREATE USER
  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      await createUser(form);
      setForm({ name: "", email: "" });
      fetchUsers();
    } catch (err) {
      alert(err.message);
    }
  };

  // OPEN MODAL
  const handleEditClick = (user) => {
    setEditUser(user);
    setIsModalOpen(true);
  };

  // UPDATE USER
  const handleUpdate = async () => {
    try {
      await updateUser(editUser.id, editUser);
      setIsModalOpen(false);
      setEditUser(null);
      fetchUsers();
    } catch (err) {
      alert(err.message);
    }
  };

  // DELETE
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure?")) return;
    await deleteUser(id);
    fetchUsers();
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>User Management</h1>

      {/* CREATE FORM */}
      <form onSubmit={handleCreate}>
        <input
          placeholder="Name"
          value={form.name}
          onChange={(e) =>
            setForm({ ...form, name: e.target.value })
          }
        />
        <input
          placeholder="Email"
          value={form.email}
          onChange={(e) =>
            setForm({ ...form, email: e.target.value })
          }
        />
        <button type="submit">Add User</button>
      </form>

      {/* TABLE */}
      <table border="1" cellPadding="10" style={{ marginTop: "20px" }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {users.map((u) => (
            <tr key={u.id}>
              <td>{u.id}</td>
              <td>{u.name}</td>
              <td>{u.email}</td>
              <td>
                <button onClick={() => handleEditClick(u)}>
                  Edit
                </button>
                <button onClick={() => handleDelete(u.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* ✅ MODAL */}
      {isModalOpen && (
        <div style={styles.overlay}>
          <div style={styles.modal}>
            <h2>Edit User</h2>

            <input
              value={editUser.name}
              onChange={(e) =>
                setEditUser({ ...editUser, name: e.target.value })
              }
              placeholder="Name"
            />

            <input
              value={editUser.email}
              onChange={(e) =>
                setEditUser({ ...editUser, email: e.target.value })
              }
              placeholder="Email"
            />

            <div style={{ marginTop: "10px" }}>
              <button onClick={handleUpdate}>Update</button>
              <button
                onClick={() => setIsModalOpen(false)}
                style={{ marginLeft: "10px" }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ✅ Simple styles
const styles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background: "rgba(0,0,0,0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  modal: {
    background: "#fff",
    padding: "20px",
    borderRadius: "8px",
    width: "300px",
  },
};

export default App;