import express from 'express';
import methodOverride from 'method-override';
import mongoose from 'mongoose';
import {body, validationResult} from 'express-validator';
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import bcrypt from 'bcryptjs';
import session from 'express-session';
import 'dotenv/config';

const app = express();
const port = 3001;

app.use(express.urlencoded());
app.use(express.json());
app.set('view engine', 'ejs');
app.use(methodOverride('_method'));
app.use(session({
    secret: "Humber",
    resave: false,
    saveUninitialized: true
  }));
app.use(passport.initialize());
app.use(passport.session());

//MongoDB connection
mongoose.connect('mongodb+srv://liamhorton:mp7password@mp7cluster.adazzly.mongodb.net/UserDB', { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Connected to MongoDB');
});

// setting up passport
passport.use(new LocalStrategy(
    async (username, password, done) => {
        const account = await Account.findOne({username: username});
        console.log(account + "1");
        if(!account || !bcrypt.compareSync(password, account.password)) {
            return done(null, false, {message: 'Incorrect username or password'});
        }
        return done(null, account);
    }
));

passport.serializeUser((account, done) => {
    done(null, account.id);
    console.log(account + "2")
});

passport.deserializeUser((id, done) => {
    Account.findById(id).then(account => {
        done(null, account);
        console.log(account + "3")
    }).catch(err => {
        done(err);
    });
});

const userSchema = new mongoose.Schema({
    name: String
}, {collection: 'userlist'});

const User = mongoose.model('User', userSchema);

const accountSchema = new mongoose.Schema({
    username: String,
    password: String
}, {collection: 'accounts'});

const Account = mongoose.model('Account', accountSchema);

app.use((req,res,next) =>{
    console.log(`${req.method} request for ${req.url}`);
    next();
    });

//registration endpoint
app.get('/register', (req, res) => {
    res.render('register.ejs');
})

app.post('/register', async (req, res) => {
    try {
        const hashedPassword = bcrypt.hashSync(req.body.password, 10);
        const newAccount = new Account({username: req.body.username, password: hashedPassword});
        await newAccount.save();
        res.redirect('/login');
    }
    catch(error) {
        console.error(error);
        res.redirect('/register');
    }
});

//login endpoint
app.get('/login', (req, res) => {
    res.render('login.ejs');
})

app.post('/login', passport.authenticate('local', {failureRedirect: '/login', failureMessage: true, successMessage:true}), (req, res) => {
    console.log(req.user + " account");
    res.redirect('/');
})

//logout endpoint
app.post('/logout', (req, res) => {
    req.logout(function(err) {
        if(err) {
            return next(err);
        }
        res.redirect('/');
    })
})



app.get('/', async (req, res) => {
    try{
        const users = await User.find();
        console.log(users);
        console.log(req.account);
        res.render('home.ejs', {users: users, account: req.user})
    }catch(err){
        console.log(err);
        res.status(500).send('Error fetching from database');
    }
});

//returns json from userlist collection in database
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
