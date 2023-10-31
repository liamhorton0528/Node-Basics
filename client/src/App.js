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
      const response = await fetch('/api/users');
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

  // const handleClear = () => {
  //   setUsers([]);
  // }
  
  const title = <h1>User List</h1>;
  
  return (
    <div>
      {title}
      <button onClick={handleRefresh}>Refresh</button>
      {/* <button onClick={handleClear}>Clear list</button> */}
      <ul>
      {users.map(user => (
    <li key={user.id}><DisplayUsers name={user.name}/></li>
  ))}
      </ul>
      {users.length > 0 && <p>There are {users.length} users listed</p>}
      <form method='POST' action='/api/users'>
        <label>Enter name for new user:</label>
        <input name='name' id='name'/>
        <button type='submit'>Submit</button>
      </form>
    </div>
  );
};

function DisplayUsers(props) {
  return(
    <div>Name: {props.name}</div>
  );
}
 
export default App;
