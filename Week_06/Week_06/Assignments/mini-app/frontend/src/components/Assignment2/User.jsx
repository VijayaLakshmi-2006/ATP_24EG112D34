import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Card from './Card';

function User() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetch("https://jsonplaceholder.typicode.com/users")
            .then((res) => res.json())
            .then((data) => setUsers(data));
    }, []);
    const [count, setCount] = useState(0);
 const handleIncrement = () => {
        setCount(count + 1);
    };

    return (
        <div className="container mt-4">
            <h3 style={{textAlign:"center",color:"blue",marginBottom:"20px",fontWeight:"bold",backgroundColor:"yellow",padding:"10px"}}>Count Value:{count}</h3>
            <div className="row">
                {users.map((user) => (
                    <div className="col-lg-3 col-md-4 col-sm-6 mb-4" key={user.id}>
                        <Card user={user} onAdd={handleIncrement}  />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default User;