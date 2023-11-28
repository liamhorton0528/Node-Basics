MINI-PROJECT-9 CHANGES:

REMOVED:
- old ejs files for user CRUD operation

ADDED:
- ejs files for home, register, login and logout pages
- home is a substitute for our react front end
- register, login and logout are forms to complete their respective operations

UPDATED:
- package.json to have more needed modules and to use ES modules instead of require
- server.js
  + changed require modules to be imported
  + created session
  + created passport with strategy to authenticate user login
  + created new account schema for logins
  + added get and post endpoint for registration
    * get renders register.ejs
    * post creates new account, saves it to the database and redirects to login. if error, redirect to register page
  + added get and post endpoint for login
    * get renders login.ejs
    * post authenticates login details and redirects to home. if account doesn't exist, redirect to login page
  + added post endpoint for logout
    * account is logged out, redirected to home page

 HOW TO RUN:
 - for react app:
   + cd Node-Basics/client
   + npm start
   + run on localhost:3000
 - for backend:
   + cd Node-Basics
   + nodemon server.js
   + run on localhost:3001 (opening on browser will show you front end using ejs files)

