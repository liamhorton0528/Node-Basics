MINI-PROJECT-10 CHANGES:

UPDATED:
- package.json to have more needed modules
- server.js
  + added access control middleware for adding users, updating users and deleting users
  + added posted_by to User schema to keep track of who added which user
  + added verification when updating and deleting users so only the person who posted the user can update/delete them
- home.ejs
  + fixed values in the update and delete forms as they were not holding certain values before

 HOW TO RUN:
 - for react app:
   + cd Node-Basics/client
   + npm start
   + run on localhost:3000
 - for backend:
   + cd Node-Basics
   + nodemon server.js
   + run on localhost:3001 (opening on browser will show you front end using ejs files)

