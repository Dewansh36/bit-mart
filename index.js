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
app.use(express.json())

const dotenv = require('dotenv');
dotenv.config({ path: './config/config.env' })

async function main() {
    mongoose.connect(process.env.DB_URL)
}

main()
    .then(() => {
        console.log('Connected!');
    })
    .catch((error) => {
        console.log(error);
    });

    // console.log(process.env.PORT);
app.listen(process.env.PORT, () => {
    console.log(`Listning on http://localhost:${process.env.PORT}`);
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

//Home and Front Pages

app.get('/', (req, res, next) => {

    res.render('home');
    //This is real res.render('home');
});

const loginRoutes=require('./routes/loginRoutes');
const userRoutes=require('./routes/userRoutes');
const product = require('./routes/productRoute')
const errorMiddleware = require('./middleware/error')

app.use('/api/v1', product)
app.use(errorMiddleware)


app.use('/', loginRoutes);

app.use('/users', userRoutes);

app.use((err, req, res, next) => {
    let { message, status }=err;
    res.status(status).send(message);
});

app.get('*', (req, res, next) => {
    throw new Apperror('Not Found', 404);
});

