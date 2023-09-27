const express = require('express');
const app = express();
const port = 3000;
const methodOverride = require('method-override');

app.use(express.urlencoded());
app.use(express.json());
app.set('view engine', 'ejs');
app.use(methodOverride('_method'));

app.use((req,res,next) =>{
console.log(`${req.method} request for ${req.url}`);
next();
});

const users = [
    {id: 1, name: 'John'},
    {id: 2, name: 'Jane'},
]


//creating home page
app.get('/', (req, res) => {
    res.send(`<h1>User Manipulation</h1>
             <div>
                <button ><a href="/api/users">See users</a></button>
                <button ><a href="/api/users/add">Add users</a></button>
                <button ><a href="/api/users/update">Update users</a></button>
                <button ><a href="/api/users/delete">Delete users</a></button>
              </div>`);
});

//creating user page
app.get('/api/users', (req, res) => {
    res.render('displayUsers.ejs', {users});
})


//add operations
app.get('/api/users/add', (req, res) => {
    res.render('addUsers.ejs', {users});
})

app.post('/api/users', (req, res)=>{

    console.log(req.body.name);

    const newUser ={
    id:users.length + 1,
    name: req.body.name
    };

    users.push(newUser);
    res.redirect('/api/users/add');

})


//update operations
app.get('/api/users/update', (req, res) => {
    res.render('updateUsers.ejs', {users});
})

app.post('/api/users/update/:id', (req, res) => {
    const userId = parseInt(req.params.id);
    const newName = req.body.name;

    const user = users.find(u => u.id === userId);

    if(user) {
        user.name = newName;
        res.redirect('/api/users/update');
    }
    else {
        res.status(404).send(`User with ID: ${userId} not found`);
    }
})

//delete operations
app.get('/api/users/delete', (req, res) => {
    res.render('deleteUsers.ejs', {users});
})

app.post('/api/users/delete/:id', (req, res) => {
    const userId = parseInt(req.params.id);

    const index = users.findIndex(u => u.id === userId);

    if(index !== -1) {
        users.splice(index, 1);
        res.redirect('/api/users/delete');
    }
    else {
        res.status(404).send(`User with ID ${userId} not found.`);
    }
})


//creating server
app.listen(port, ()=>{
    console.log(`Server running at http://localhost:${port}/`);
})
