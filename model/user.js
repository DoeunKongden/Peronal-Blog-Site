const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const {isEmail} = require('validator') //third party package validator 
const bcrypt = require('bcrypt')



const userSchema = new Schema({
    //defining properties for user
    //creating a user schema

    email:{
        type: String,
        require: [true, 'Please Enter an email'],  //error message that gonna render
        unique: true, // for not lettin user use two emails in a row
        //basically checking if the there is a duplicate email
        lowercase: true, //turing email user input to lowercase
        validate:[isEmail, 'Please Enter a valid email'] //checking to see if it is a valid email
    },
    password:{
        type: String,
        require: [true,'Please Enter Password'], 
        minlength: [8,'Minimun password lenght is 8 character'], //make sure that user password can't be less then 8 character long
    }
});

//fire fucntion before document save to DB
userSchema.pre('save', async function(next){
    const salt  = await bcrypt.genSalt(); //gensalt is an asycn fucntion
    this.password = await bcrypt.hash(this.password,salt);
    next();
})


//firing fucntion after a new user has been created
userSchema.post('save', function (doc,next){ //this mean that when the save even happend we fire a fcuntion 
    console.log("new user was created and save",doc)
    next();
})  //refer to  something happending after something else happen


const User = mongoose.model('User', userSchema);

module.exports = User;