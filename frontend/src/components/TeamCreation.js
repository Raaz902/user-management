// src/components/TeamCreation.js
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createTeam } from '../features/teams/teamSlice';
import './TeamCreation.css'; // Import the CSS file for styling

const TeamCreation = () => {
  const [selectedUsers, setSelectedUsers] = useState([]);
  const users = useSelector((state) => state.users.list);
  const dispatch = useDispatch();

  const handleSelectUser = (user) => {
    if (!selectedUsers.some(u => u.domain === user.domain) && user.available) {
      setSelectedUsers([...selectedUsers, user]);
    }
  };

  const handleCreateTeam = () => {
    dispatch(createTeam(selectedUsers));
    setSelectedUsers([]); // Clear selection after creating team
  };

  return (
    <div className="team-creation-container">
      <h2>Create Team</h2>
      <div className="user-list">
        {users.map((user) => (
          <div key={user.id} className="user-card" onClick={() => handleSelectUser(user)}>
            <img src={user.avatar} alt={`${user.first_name}'s avatar`} className="user-avatar" />
            <div className="user-info">
              <h3>{user.first_name} {user.last_name}</h3>
              <p><strong>Domain:</strong> {user.domain}</p>
              <p><strong>Available:</strong> {user.available ? 'Yes' : 'No'}</p>
            </div>
          </div>
        ))}
      </div>
      <button onClick={handleCreateTeam} className="create-team-button">Create Team</button>
      <div className="selected-users">
        <h3>Selected Team</h3>
        {selectedUsers.map((user) => (
          <div key={user.id} className="selected-user-card">
            <img src={user.avatar} alt={`${user.first_name}'s avatar`} className="user-avatar" />
            <div className="user-info">
              <h4>{user.first_name} {user.last_name}</h4>
              <p><strong>Domain:</strong> {user.domain}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeamCreation;
