const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose');
const blogsRoutes = require('./routes/blogsRoutes')


const app = express();
const dbUrl = 'mongodb+srv://doeunkongden:den112233@blogcluster.vavfo.mongodb.net/BlogDatabase?retryWrites=true&w=majority'

mongoose.connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true }) 
    .then((result) => app.listen(3000)) 
    .catch((error) => console.log(error));

app.set('view engine', 'ejs')

app.use(express.static('public'))  
app.use(express.urlencoded({ extended: true })) 
app.use(morgan('dev'))


app.get('/', (req, res) => {
   
    res.redirect('/blogs')
})

app.get('/about', (req, res) => {
    res.render('about', { title: 'About' })
})

app.use('/blogs/', blogsRoutes);

app.use((req, res, next) => {
    console.log('new request made');
    console.log('host:', req.hostname);
    console.log('path:', req.path);
    console.log('method:', req.method);

    next();
})