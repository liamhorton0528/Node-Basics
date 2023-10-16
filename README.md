- removed file.txt & fileOperations.js
  
- added addUsers.ejs, deleteUsers.ejs, updateUsers.ejs, displayUsers.ejs
  * displayUsers.ejs will display the user ids and names
    
  * addUsers.ejs will display the user ids and names as well as give the user the option to add users
    + textbox below the user list that allows the user to enter a name for a new user that they will create
    + user is created once the user clicks the "add new user" button
      
  * updateUsers.ejs will display the user ids and names as well as allow the user to change the name of one of the users
    + textbox under each user that allows the user to enter a new name for that user
    + accompanying "Update" button will update the users name on click
      
  * deleteUsers.ejs will display the user ids and names as well as give the user the option to delete a user
    + button labeled "Delete" below each user that will delete the respective user on click

  !! EACH PAGE HAS A HOME BUTTON AT THE BOTTOM OF THE PAGE WHICH WILL BRING THEM TO THE ROOT
      
-Completely changed server.js
  * changed server.js to use express.js for all the routing
  * can now create new users
  * can now update user names
  * can now delete users

MINI-PROJECT-4 CHANGES:
- created promises for GET requests
  * error handling with try/catch blocks
- Added callback method that logs how many users have been listed whenever opening the users page
- The Node.js event loop is a constant loop that will read your code, find all the tasks that need to be completed and then completes them. Once it
  completes these tasks, it waits for new tasks to come in. If there is a delay for some tasks then it will wait to complete them until the specifed amount of time is over.
  For example, if you have a task in a function that has a 1 second delay on it and a task following that one that doesn't, the second task will be completed first because it gets added to the list of tasks
  that the event loop has to complete first whereas the first task waited a second to be added.

MINI-PROJECT-5 CHANGES:
- created react app within the existing project:
  * uses JSX to print title "User List"
  * uses component with internal state to:
    + fetch user data
    + list user data with map function
    + creates refresh button that refreshes the data being listed
  * uses functional component when listing users
