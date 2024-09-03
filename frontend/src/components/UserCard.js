import React from 'react';

const UserCard = ({ user }) => (
    <div className="card">
        <img src={user.avatar} alt={`${user.first_name} ${user.last_name}`} />
        <div>
            <h3>{user.first_name} {user.last_name}</h3>
            <p>{user.email}</p>
            <p>{user.domain}</p>
            <p>{user.available ? 'Available' : 'Not Available'}</p>
        </div>
    </div>
);

export default UserCard;
