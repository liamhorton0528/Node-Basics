import express from 'express';
import methodOverride from 'method-override';
import mongoose from 'mongoose';
import {body, validationResult} from 'express-validator';
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import bcrypt from 'bcryptjs';
import session from 'express-session';
import 'dotenv/config';
import jwt from 'jsonwebtoken';
import cors from 'cors';

const app = express();
const port = 3001;

app.use(express.urlencoded());
app.use(express.json());
app.set('view engine', 'ejs');
app.use(methodOverride('_method'));
app.use(session({
    secret: "Humber",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
  }));
app.use(passport.initialize());
app.use(passport.session());
app.use(cors());

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
        console.log(account);
        if(!account || !bcrypt.compareSync(password, account.password)) {
            return done(null, false, {message: 'Incorrect username or password'});
        }
        return done(null, account);
    }
));

passport.serializeUser((account, done) => {
    done(null, account.id);
});

passport.deserializeUser((id, done) => {
    Account.findById(id).then(account => {
        done(null, account);
    }).catch(err => {
        done(err);
    });
});

const ensureAuthenticated = (req, res, next) => {
    if(req.isAuthenticated()) {
        return next();
    }
    else {
        res.redirect('/login');
    }
};

const verifyToken = (req, res) => {
    const token = req.header('Authorization')?.split(' ')[1];
    if(!token) return res.sendStatus(401);

    jwt.verify(token, 'SECRET', (err, user) => {
        if(err) return res.sendStatus(403);
        req.user = user;
        next();
    });
};

const userSchema = new mongoose.Schema({
    name: String,
    posted_by: mongoose.Schema.Types.ObjectId
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
    const token = jwt.sign({id: req.user.id}, 'SECRET', {expiresIn: '1h'});
    res.header('Authorization', `Bearer ${token}`);
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

//add user
app.post('/api/users', ensureAuthenticated, [body('name').isLength({min: 1})], async (req, res) => {
    const newUser = new User({name: req.body.name, posted_by: req.user._id});
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }

    try{
        const result = await newUser.save();
        console.log('saved to database:', result);
        res.redirect('/');
    }catch(err){
        console.log(err);
        res.status(500).send('Error saving to database');
    }
})

//update
app.post('/api/users/update', ensureAuthenticated, [body('newName').isLength({min: 1})], async (req, res) => {
    const userID = req.body.id;
    const newName = req.body.newName;
    console.log(userID + ' ' + newName);

    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }

    try {
        const doc = await User.findById(userID);

        if(!doc.posted_by.equals(req.user._id)) {
            res.status(500).send('You are not the one who added this user so you may not update them.');
        }

        doc.name = newName;
        await doc.save();
        res.redirect('/');
    }
    catch(err) {
        console.log(err);
        res.status(500).send('Error updating user');
    }
})

//delete
app.post('/api/users/delete', ensureAuthenticated, async (req, res) => {
    try {
        const userID = req.body.id;
        const doc = await User.findById(userID);

        if(!doc.posted_by.equals(req.user._id)) {
            res.status(500).send('You are not the one who added this user so you may not delete them.');
        }

        await doc.deleteOne();
        res.redirect('/');
    }
    catch (err) {
        console.log(err);
        res.status(500).send('Error deleting user');
    }
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
