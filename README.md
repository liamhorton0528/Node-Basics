# Node-Basics
- in the fileOperations.js file, a fs constant is being created that will be used to read our file which is simply named file.txt.
- using the method "readFile", we will read our file and have 2 props, err and data which will collect error info and the info from our file.
- if an error is detected, there is a text that will be printed in the console stating there was an error and what the error is.
- regardless of whether or not there is an error, the console will also log whatever data may have picked up

- in server.js, constants for http and fs modules are created for our HTTP server and to read data from our users.json file.
- the server is created
- the server checks the request method to see if it is "GET" and if the API endpoint is /api/users
  - if it is then the json file is read
  - if there is an error with the server then it will throw an error
  - regardless of an error, whatever is read from the file is used as a response
- if the request method and API endpoint don't match then the response will say "Not Found"
- in the last few lines, the server is told to listen to port 3000 and to log where it is running in the console


//i wasn't completely sure what i was supposed to do for this, there were 2 lists of instructions for this project and one said to create API endpoints for each CRUD operation however i was only able to get the retrieve(GET)
//request working using postman so i didn't end up doing the other operations.
//i'm not sure if you went over them in the lesson for this as i missed it and i've been busy so i only got to doing this project tonight

<a href="https://codeclimate.com/github/liamhorton0528/Node-Basics/test_coverage"><img src="https://api.codeclimate.com/v1/badges/d4eeb648f6570a9287d7/test_coverage" /></a>
