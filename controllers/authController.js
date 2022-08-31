const User = require('../model/user')
const jwt = require('jsonwebtoken')


//hanlde errors
const handleError = (err) => {
    console.log(err.message, err.code)
    let errors = { email: '', password: '' } //creating an object

    //duplicate error code
    if (err.code == 11000) {
        errors.email = "That email is already register";
        return errors;
    }
    //validation errors
    if (err.message.includes('User validation')) {
        Object.values(err.errors).forEach(({ properties }) => {
            //accessing the errors object
            errors[properties.path] = properties.message;
        });
    }

    return errors;
}

//creating token
const maxAge = 3 * 24 * 60 * 60 //3day 24hour 60mn 60s
const creatToken = (id) => {
    return jwt.sign({ id }, 'den blog secret', {  //using sing method to sign our JWT
        expiresIn: maxAge //jwt expect second while cookie expect ms
    });  //passing in payload
}

module.exports.singup_get = (req, res) => {
    res.render('auth/singup', { title: "Singup" });
}

module.exports.login_get = (req, res) => {
    res.render('auth/login', { title: "Login" });
}

module.exports.singup_post = async (req, res) => {
    const { email, password } = req.body

    if (!(body.email && body.password)) {
        return res.status(400).send({ error: "Data not formatte properly" })
    }

    try {
        const user = await User.create({ email, password })
        const token = creatToken(user._id);
        res.cookie('jwt'/*name*/, token /*value*/, { httpOnly: true, maxAge: maxAge * 1000 });
        res.status(201).json({ user: user._id }); //success q
        console.log(user)
    } catch (err) {
        const errors = handleError(err)
        res.status(400).json({ errors });
    }
}

module.exports.login_post = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.login(email,password);
        res.status(200).json({ user: user._id })    
    } catch (err) {
        console.log("wrong password")
        res.status(400).json({})
    }
}