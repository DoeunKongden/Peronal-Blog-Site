const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose');
const Blog = require('./model/blog');


//express app
const app = express();

//connecting to MongoDB
const dbUrl = 'mongodb+srv://doeunkongden:den112233@blogcluster.vavfo.mongodb.net/BlogDatabase?retryWrites=true&w=majority'

//listening to request
// app.listen(3000)

//this connection is asyncronist task therefor it would take some time to do
//in which we can use then and catch method
mongoose.connect(dbUrl,{useNewUrlParser:true, useUnifiedTopology: true}) //these option in the brackets are gonna stop the deprication warning 
    .then((result)=>app.listen(3000)) //will only take in req and res after the database is connected
    .catch((error) =>console.log(error));
//regiester view engine;
app.set('view engine','ejs')

//listening for request


//middle ware and static file that we gonna make public
app.use(express.static('public'))  //using static middle ware to render file such as jpeg or 

app.use(morgan('tiny ')) //Concise output colored by response status for development use.
//cyan for redirection codes

//creating our own middle ware
app.use((req,res,next)=>{
    console.log('new request made');
    console.log('host:', req.hostname);
    console.log('path:', req.path);
    console.log('method:', req.method);

    next(); ;8//invoking the next function to tell node that we are done with this function 
}) //the browser is hanging right now becuase it does not know what to do next
// it just run the app.use and now it stop right here
//next we gonna use app.next to solve this problem


//Basic normal route
app.get('/',(req,res)=>{
    //redirecting to blogs route where we will be intergrating with the database
    res.redirect('/blogs')
})//listening to our get request
app.get('/about',(req,res)=>{

    res.render('about',{title:'About'})
    //res.send("<p>about page</p>"); //respon by sending something

})//listening to our get request


//Blog route
app.get('/blogs', (req,res)=>{
    Blog.find().sort({createdAt: -1}) //createdAt:-1 is going thru the database collection by descending order
    .then((result) => {
        res.render('home',{title:'All Blogs', blogs:result})
    })
    .catch((error)=>{
        console.log(error)
    })
})

app.get('/blogs/create',(req,res)=>{
    res.render('create',{title:'Create a new Blog'});
})

//404 page

app.use((req,res)=>{
    res.status(404).render('404',{title:'404'})
    
}) //this method is for create middle ware and fire middle ware fucntion