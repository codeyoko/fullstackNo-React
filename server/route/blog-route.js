const express = require('express');
const blogRouter = express.Router();

const {
    fetchListOfBlog, 
    addNewBlog, 
    deleteABlog, 
    updateABlog
} = require('../controller/blog-controller');

blogRouter.get('/', fetchListOfBlog);
blogRouter.post('/add', addNewBlog);
blogRouter.put('/update/:id', updateABlog);
blogRouter.delete('/delete/:id', deleteABlog);

module.exports = blogRouter;