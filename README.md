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
- Created react app
- React app features class and functional components
- JSX that prints "User List" at the top of the screen
- class component stores user info, contains a button handler and lists the users
- button added that gives the user the option to empty the list

ISSUES:
- I didn't know how to use the API in the starter example as I didn't get any data back from the call
- i tried running the express app simultaneously with the react app to see if they just needed to be running together, even changing the port
  for the express app to make sure there weren't any issues with both projects running on the same port (only the express app would work when they were on the same port)
- I didn't add any conditional rendering as it wasn't in the notes and I'mm not sure how to do it
