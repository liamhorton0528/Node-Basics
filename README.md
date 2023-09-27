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
