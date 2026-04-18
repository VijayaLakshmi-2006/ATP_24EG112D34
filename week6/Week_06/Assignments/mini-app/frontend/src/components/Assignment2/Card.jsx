import React from 'react';

function Card({ user,onAdd }) {
    return (
        <div style={{
            border: "1px solid #ddd",
            borderRadius: "8px",
            padding: "12px",
            background: "#fff",
            fontSize: "14px",
            lineHeight: "1.5"
        }}>
            <p><strong>{user.name}</strong> (@{user.username})</p>

            <p>Email: {user.email}</p>
            <p>Phone: {user.phone}</p>
            <p>Website: {user.website}</p>

            <p>
                Address: {user.address.street}, {user.address.city}
            </p>

            <p>
                Company: {user.company.name}
            </p>
            <button onClick={onAdd} style={{
                background: "#007bff",
                color: "#fff",
                border: "none",
                borderRadius: "4px",
                padding: "8px 12px",
                cursor: "pointer"
            }}>Add User</button>
        </div>
    );
}

export default Card;