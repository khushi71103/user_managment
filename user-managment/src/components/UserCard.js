// src/components/UserCard.js
import React from "react";

const UserCard = ({ user, onEdit, onDelete }) => {
  return (
    <div className="user-card">
      <img src={user.avatar} alt={`${user.first_name} ${user.last_name}`} />
      <h3>{`${user.first_name} ${user.last_name}`}</h3>
      <p>{user.email}</p>
      <div className="card-buttons">
        <button onClick={() => onEdit(user)}>Edit</button>
        <button onClick={() => onDelete(user.id)}>Delete</button>
      </div>
    </div>
  );
};

export default UserCard;
