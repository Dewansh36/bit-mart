const express=require('express');
const app=express();
const mongoose=require('mongoose');
const ejsmate=require('ejs-mate');
const session=require('express-session');
const flash=require('connect-flash');
const passport=require('passport');
const localStrat=require('passport-local');
const path=require('path');
const User=require('./models/user');

async function main() {
    mongoose.connect('mongodb://localhost:27017/BitMart');
}

main()
    .then(() => {
        console.log('Connected!');
    })
    .catch((error) => {
        console.log(error);
    });

//Setting ejs and views Directory

app.engine('ejs', ejsmate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

//Setting up Public Directory for static files

app.use(express.static(path.join(__dirname, 'public')));

// Configuring Express Sessions 

app.use(session({ secret: 'Enter Secret Here', saveUninitialized: true, resave: false }));

//Passport configure

app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrat('User', User.Userauthenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


//Home and Front Pages

app.get('/', (req, res, next) => {

    res.send('Home!');
    //This is real res.render('home');
});

//Registration Login Logout Routes

app.get('/register', async (req, res, next) => {
    res.render('users/registration');
});


app.post('/register', async (req, res, next) => {
    try {
        if (req.body.password!=req.body.cpass) {
            res.redirect('/register');
        }
        const user=new User(
            {
                username: req.body.username,
                email: req.body.email,
                name: req.body.firstname+req.body.lastname,
                mob: req.body.mob,
                batch_year: req.body.batchyear,
                roll: req.body.roll
            }
        );
        // console.log(req.body);
        // console.log(newUser, req.body);

        const regUser=await User.register(user, req.body.password);

        console.log(regUser);

        req.logIn(regUser, (err) => {
            if (err) {
                console.log(err);
                res.redirect('/login');
            }
        });
        // req.flash('success', 'Successfully Registered!');
        const curUser=regUser;
        // console.log(curUser);
        res.render('selectPage', { curUser });
    }
    catch (err) {
        console.log(err);
        res.redirect('/register');
    }
});

app.get('/login', (req, res, next) => {
    res.render('users/login');
});

app.post('/login', passport.authenticate('local', { failureFlash: false, failureRedirect: '/login' }), (req, res, next) => {

    const curUser=req.user;
    console.log(curUser);
    res.render('selectPage', { curUser });
});

app.get('/logout', (req, res, next) => {
    req.logOut();
    res.redirect('/');
});


app.get('*', (req, res, next) => {
    res.send('404 NOT FOUND!');
});


app.listen(3000, () => {
    console.log('Listning on Port 3000');
});