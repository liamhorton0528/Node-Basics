import React from 'react';

const title = <h2>User List:</h2>;

class app extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [
        {
          "id": 1,
          "name": "John"
        },
        {
          "id": 2,
          "name": "Jane"
        }
      ]
    }
  }

  buttonHandler = () => {
    this.setState({users: []});
  }

  render() {
    return(
      <div>
        {title}
        <ul>
        {this.state.users.map(
            (user) => (
              <li key={user.id}><User id={user.id} name={user.name}/></li>
            )
        )}
        </ul>
        <button onClick={this.buttonHandler}>Empty List</button>
      </div>
    );
  }
}

function User(props) {
  return(
    <div>ID: {props.id} <br/> Name: {props.name}</div>
  )
}

export default app;