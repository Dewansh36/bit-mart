const express=require('express');
const app=express();
const mongoose=require('mongoose');
const ejsmate=require('ejs-mate');
const session=require('express-session');
const flash=require('connect-flash');
const passport=require('passport');
const localStrat=require('passport-local');
const path=require('path');
const methodOverride=require('method-override');
const User=require('./models/user');
const Apperror=require('./utils/errorClass');
app.use(express.urlencoded({ extended: true }));


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

// Configuring Flash

app.use(flash());

//Setting Locals

app.use((req, res, next) => {
    res.locals.success=req.flash('success');
    res.locals.error=req.flash('error');
    res.locals.user=req.user;
    next();
});

//Passport configure

app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrat({
    usernameField: 'email'
}, User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Method Override for Other Types of Requests like put ,delete etc

app.use(methodOverride('_method'));

// Catch All Async errors

//Home and Front Pages

app.get('/', (req, res, next) => {

    res.render('home');
    // res.send(res.locals.success);
    //This is real res.render('home');
});

//Registration Login Logout Routes

app.get('/signin', async (req, res, next) => {
    // console.log(req.flash('success'));
    res.render('user/login');
});


app.post('/register', async (req, res, next) => {
    try {
        console.log(req.body);
        // res.send(req.body);
        const user=new User(
            {
                name: req.body.name,
                email: req.body.email,
                roll: req.body.roll
            }
        );

        // res.send(user);
        const regUser=await User.register(user, req.body.password);

        console.log(regUser);
        // res.send(regUser);

        req.logIn(regUser, (err) => {
            if (err) {
                console.log(err);
                req.flash('error', err.message);
                res.redirect('/signin');
            }
        });
        req.flash('success', 'Successfully Registered!');
        const curUser=regUser;
        // console.log(curUser);
        res.send(curUser);
        // res.render('selectPage', { curUser });
    }
    catch (err) {
        console.log(err);
        req.flash('error', err.message);
        res.redirect('/signin');
    }
});


app.post('/login', passport.authenticate('local', { failureFlash: true, failureRedirect: '/signin' }), (req, res, next) => {

    const curUser=req.user;
    console.log(curUser);
    req.flash('success', 'Welcome Back!');
    res.send(curUser);
    // res.render('selectPage', { curUser });
});

app.get('/logout', (req, res, next) => {
    req.logOut();
    req.flash('success', 'Aloha! See You Soon');
    res.redirect('/');
});

//User Profile Routes

app.get('/users/:id', async (req, res, next) => {
    let { id }=req.params;
    const user=await User.findById(id)
        .populate('articles')
        .populate('orders');
    res.send(user);
});

app.get('/users/:id/edit', async (req, res, next) => {
    let { id }=req.params;
    const user=await User.findById(id);
    console.log(user);
    res.render('user/edit', { user });
});

app.put('/users/:id', async (req, res, next) => {
    let { id }=req.params;
    const user=await User.findByIdAndUpdate(id, req.body, { runValidators: true, new: true });
    req.flash('success', 'Successfully Updated User Details!');
    res.redirect(`/`);
});

app.delete('/users/:id', async (req, res, next) => {
    let { id }=req.params;
    await User.findByIdAndDelete(id);
    req.flash('success', 'Successfully Deleted User!');
    res.redirect('/');
});

app.use((err, req, res, next) => {
    let { message, status }=err;
    res.status(status).send(message);
});

app.get('*', (req, res, next) => {
    throw new Apperror('Not Found', 404);
});


app.listen(3000, () => {
    console.log('Listning on Port 3000');
});