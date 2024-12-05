import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import UserCard from "../../components/UserCard";
import "./Users.css";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editUser, setEditUser] = useState(null);
  const [editForm, setEditForm] = useState({});
  const navigate = useNavigate();

  // Fetch users from API
  const fetchUsers = async (pageNum) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`https://reqres.in/api/users?page=${pageNum}`);
      setUsers(response.data.data);
      setFilteredUsers(response.data.data);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      setError("Failed to fetch users.");
    }
  };

  // Handle search
  const handleSearchChange = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    const filtered = users.filter(
      (user) =>
        user.first_name.toLowerCase().includes(query) ||
        user.last_name.toLowerCase().includes(query) ||
        user.email.toLowerCase().includes(query)
    );
    setFilteredUsers(filtered);
  };

  // Handle edit form change
  const handleEditFormChange = (e) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  // Save edited user
  const saveEditedUser = async () => {
    try {
      await axios.put(`https://reqres.in/api/users/${editUser.id}`, editForm);
      setFilteredUsers((prev) =>
        prev.map((user) => (user.id === editUser.id ? { ...user, ...editForm } : user))
      );
      setEditUser(null);
    } catch {
      alert("Failed to update user.");
    }
  };

  // Delete user
  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://reqres.in/api/users/${id}`);
      setFilteredUsers((prev) => prev.filter((user) => user.id !== id));
    } catch {
      alert("Failed to delete user.");
    }
  };

  // Logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  // On mount, check authentication and fetch data
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
    } else {
      fetchUsers(page);
    }
  }, [page, navigate]);

  return (
    <div className="users-page">
      <h1>Users List</h1>

      <input
        type="text"
        value={searchQuery}
        onChange={handleSearchChange}
        placeholder="Search users by name or email"
        className="search-input"
      />

      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}

      <div className="user-card-container">
        {filteredUsers.length > 0 ? (
          <UserCard
            key={filteredUsers[0].id}
            user={filteredUsers[0]}
            onEdit={() => {
              setEditUser(filteredUsers[0]);
              setEditForm({ first_name: filteredUsers[0].first_name, last_name: filteredUsers[0].last_name, email: filteredUsers[0].email });
            }}
            onDelete={handleDelete}
          />
        ) : (
          <p className="no-results">No results found</p>
        )}
      </div>

      <div className="pagination">
        <button onClick={() => setPage((prev) => Math.max(prev - 1, 1))} disabled={page <= 1}>
          Previous
        </button>
        <span>Page {page}</span>
        <button onClick={() => setPage((prev) => prev + 1)}>Next</button>
      </div>

      <button className="logout-btn" onClick={handleLogout}>
        Logout
      </button>

      {editUser && (
        <div className="edit-modal">
          <div className="edit-modal-content">
            <h2>Edit User</h2>
            <input
              type="text"
              name="first_name"
              value={editForm.first_name}
              onChange={handleEditFormChange}
              placeholder="First Name"
            />
            <input
              type="text"
              name="last_name"
              value={editForm.last_name}
              onChange={handleEditFormChange}
              placeholder="Last Name"
            />
            <input
              type="email"
              name="email"
              value={editForm.email}
              onChange={handleEditFormChange}
              placeholder="Email"
            />
            <button onClick={saveEditedUser}>Save</button>
            <button onClick={() => setEditUser(null)}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Users;
