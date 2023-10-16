import React, { useState, useEffect } from 'react';
import axios from 'axios';
 
// Functional component
const App = () => {
  const [users, setUsers] = useState([]); // State for users
 
  // Fetch users from API
  useEffect(() => {
    fetchUsers();
  }, []);
 
 
 
 
  const fetchUsers = async () => {
    try {
      const response = await fetch('api/users');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log(data);
      setUsers(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  // Event handler for refreshing users
  const handleRefresh = () => {
    fetchUsers(); 
  }
  
  const title = <h1>User List</h1>;
  
  return (
    <div>
      {title}
      <button onClick={handleRefresh}>Refresh</button>
      <ul>
      {users.map(user => (
    <li key={user.id}><DisplayUsers name={user.name} id={user.id}/></li>
  ))}
      </ul>
    </div>
  );
};

function DisplayUsers(props) {
  return(
    <div>Name: {props.name}, ID: {props.id}</div>
  );
}
 
export default App;
