const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose');
const blogsRoutes = require('./routes/blogsRoutes')
const authController = require('./controllers/authController');
const cookieParser = require('cookie-parser');
// const AuthRoutes = require('./routes/authRoutes')


const app = express();
const dbUrl = 'mongodb+srv://doeunkongden:den112233@blogcluster.vavfo.mongodb.net/BlogDatabase?retryWrites=true&w=majority';

mongoose.connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((result) => app.listen(3000))
    .catch((error) => console.log(error));

//middleware 
app.use(cookieParser());
app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));


//route
app.get('/', (req, res) => {
    res.redirect('/login')
})
app.get('/about', (req, res) => {
    res.render('about', { title: 'About' })
})

//authentication route
app.get('/signup',authController.singup_get)

app.get('/login',authController.login_get)

app.post('/login', authController.login_post)

app.post('/signup', authController.singup_post)
//end of authentication route

//blog routes
app.use('/blogs/', blogsRoutes);


app.use((req, res, next) => {
    console.log('new request made');
    console.log('host:', req.hostname);
    console.log('path:', req.path);
    console.log('method:', req.method);
    next();
})