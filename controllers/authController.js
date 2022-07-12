const User = require('../model/user')


//hanlde errors
const handleError = (err) =>{
    console.log(err.message, err.code)
    let errors = {email:'', password:'' } //creating an object

    //duplicate error code
    if(err.code == 11000){
        errors.email = "That email is already register";
        return errors;
    }
    //validation errors
    if(err.message.includes('User validation')){
        Object.values(err.errors).forEach(({properties}) => {
            //accessing the errors object
            errors[properties.path] = properties.message;
        });
    }

    return errors;
}


module.exports.singup_get = (req,res) =>{
    res.render('auth/singup', {title:"Singup"});
}

module.exports.login_get = (req,res) =>{
    res.render('auth/login', {title:"Login"});
}

module.exports.singup_post = async (req,res) =>{
    const {email,password} = req.body
    
    try{
       const user = await User.create({email,password}) 
       res.status(201).json(user); //success q
    }catch(err){
        const errors = handleError(err)
        res.status(400).json({errors});
    }
}

module.exports.login_post = async (req,res) =>{
    const {email, password} = req.body;
    console.log(email,password)
    res.send('user login');
}