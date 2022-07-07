const mongoose = require('mongoose')
const Schema = mongoose.Schema; //this is a constructor function use for creating our schema

const blogSchema = new Schema({ //mongoose is creating schema for us 
    //and here we are defining what properties should our data have and what handler to put
    title:{
        type: String,
        require: true,
    }, //adding bracket so we can at more validation
    snippet:{
        type: String,
        require: true,
    },
    body:{
        type:String,
        require: true,
    },
}, {timestamps: true}) //adding more option to our schema 

//timestamps is :will autimatically generate timestamp properties for us in our document

//a model sorround the schema and provide us with an interface to communicate with all the database collection for that document type

//storing model start with capital letters alwasy
//defining model and passing in two parameter ('database name','schema')
const Blog = mongoose.model('Blog',blogSchema) // the reason naming is here important is becaues mongoose model is going to pluralize this 'Blog' 
//and it gonna look into the database for that


module.exports  = Blog; // Exporting the Blog model so we can use it else where in our file
