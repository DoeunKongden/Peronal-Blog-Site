const express = require('express')
const Blog = require('../model/blog');
const router = express.Router(); //create router object
const blogController = require('../controllers/blogsController')

//Blog route  //form for creating blogs post is gonna be sent here
//using controller from blogsController

//blog index
router.get('/', blogController.blog_index);
//post method for creating new blog in the /blogs url
//saving new created blog to database
router.post('/', blogController.create_post);

//creating blog route
router.get('/create', blogController.create_get)

router.get('/:id', blogController.blog_detail);  //:id is for extracting the id from the route parameter


// deleting blog
router.delete('/:id', blogController.blog_delete)


//404 page
router.use((req, res) => {
    res.status(404).render('404', { title: '404' })
}) //this method is for create middle ware and fire middle ware fucntion

module.exports = router;