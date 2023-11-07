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
    <li><DisplayUsers name={user.name} id={user._id}/></li>
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
    <div>
      <div>Name: {props.name}</div>
      <form method='POST' action='/api/users/update'>
        <label>Change name of user: </label>
        <input name='newName' />
        <input hidden name='id' value={props.id}/>
        <button type="submit">Submit</button>
        <br />
      </form>
      <form method='POST' action='/api/users/delete'>
        <input hidden name='id' value={props.id}/>
        <button type='submit'>Delete this user</button>
      </form>
    </div>
  );
}
 
export default App;
