const express = require('express');
const app = express();
const port = 3001;
const methodOverride = require('method-override');
const mongoose = require('mongoose');
const {body, validationResult} = require('express-validator');

app.use(express.urlencoded());
app.use(express.json());
app.set('view engine', 'ejs');
app.use(methodOverride('_method'));
app.use((req,res,next) =>{
console.log(`${req.method} request for ${req.url}`);
next();
});

//MongoDB connection
mongoose.connect('mongodb+srv://liamhorton:mp7password@mp7cluster.adazzly.mongodb.net/UserDB', { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Connected to MongoDB');
});

const userSchema = new mongoose.Schema({
    name: String
}, {collection: 'userlist'});

const User = mongoose.model('User', userSchema);


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

app.get('/api/users', async (req, res) => {
    try{
        const users = await User.find();
        res.json(users);
    }catch(err){
        console.log(err);
        res.status(500).send('Error fetching from database');
    }
})

app.post('/api/users', [body('name').isLength({min: 1})], async (req, res) => {
    const newUser = new User({name: req.body.name});
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }

    try{
        const result = await newUser.save();
        console.log('saved to database:', result);
        res.redirect('/api/users');
    }catch(err){
        console.log(err);
        res.status(500).send('Error saving to database');
    }
})

//update
app.post('/api/users/update', [body('newName').isLength({min: 1})], async (req, res) => {
    const userID = req.body.id;
    const newName = req.body.newName;
    console.log(userID + ' ' + newName);

    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }

    const doc = await User.findById(userID);
    doc.name = newName;
    await doc.save();
    res.redirect('/api/users');
})

//delete
app.post('/api/users/delete', async (req, res) => {
    const userID = req.body.id;
    const doc = await User.findById(userID);
    await doc.deleteOne();
    res.redirect('/api/users');
})

function showNumOfUsers(num) {
    console.log('There are ' + num + ' listed users.');
}

function processNumOfUsers(callback) {
    const num = users.length;
    callback(num);
}


//creating server
app.listen(port, ()=>{
    console.log(`Server running at http://localhost:${port}/`);
})
