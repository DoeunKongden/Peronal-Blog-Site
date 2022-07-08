//importing 
const Blog = require('../model/blog')
//creating function for our blog
//blog_index , blog_detail, blog_create_get, blog_creat_post, blog_delete

//blog_index
const blog_index = (req, res) => {
    Blog.find().sort({ createdAt: -1 }) //createdAt:-1 is going thru the database collection by descending order
        .then((result) => {
            res.render('blogs/home', { title: 'All Blogs', blogs: result })
        })
        .catch((error) => {
            console.log(error)
        })
};

//blog_detail
const blog_detail = (req, res) => {
    const id = req.params.id;
    console.log(id);

    Blog.findById(id)
        .then((result) => {
            res.render('blogs/details', { blog: result, title: 'Blog Detail' });
        })
        .catch((err) => {
            res.status(404).render('404', {title: 'blog not found'})
        })
};

//blog_delete
const blog_delete = (req, res) => {
    const id = req.params.id

    Blog.findByIdAndDelete(id)
        .then(result => {
            res.json({ redirect: '/' }); //respond with json
        })
        .catch((err) => {
            console.log(err);
        })
};

const create_get = (req, res) => {
    res.render('blogs/create', { title: 'Create a new Blog' });
};

const create_post = (req, res) => {
    //using a middleware which is gonna pass the data that we send into a workable format that we gonna use and it gonna attacht into the req object
    console.log(req.body);
    const blog = new Blog(req.body) //creating a new blog for the title snippet and the body

    blog.save()
        .then((result) => {
            res.redirect('/');
        })
        .catch((err) => {
            console.log(err)
        })
}

module.exports = {
    blog_index,
    blog_detail,
    blog_delete,
    create_get,
    create_post
};
