const mongoose = require('mongoose');
const Blog = require('../model/Blog')

/* fetch list of blog
    add a new blog 
    delete a blog 
    update a blog 
*/

//fetch list of blog
const fetchListOfBlog = async(req,res) => {

    let blogList;
    try{

        blogList = await Blog.find();
    }catch(err){
        console.log(err);
    }

    if(!blogList) {
        return res.status(404).json({message: 'No Blog found'});
    }

    return res.status(200).json({blogList});
};

//add a new blog
const addNewBlog = async(req, res) => {
    const {title, description} = req.body;
    const currentDate = new Date();

    //create new blog
    const newlyCreateBlog = new Blog({
        title, description, date : currentDate
    });

    try {
        await newlyCreateBlog.save();
    } catch (error) {
        console.log(error);
    }

    //save db
    try {
        const session = await mongoose.startSession();
        session.startTransaction();
        await newlyCreateBlog.save(session);
        session.commitTransaction(); 
    } catch (error) {
        return res.status(500).json({message: error.message});
    }

    return res.status(200).json({ newlyCreateBlog });
};

//delete Blog

const deleteABlog = async(req,res) => {
    const id = req.params.id;

    try {
        const findCurrentBlog = await Blog.findByIdAndDelete(id);
        if(!findCurrentBlog){
            return res.status(400).json({message: 'Blog not found'});
        }

        return res.status(200).json({message: 'Blog deleted successfully'});    
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: 'Unable to delete! Please try again'});
    }
};

//updat Blog
const updateABlog = async(req, res) => {
    const id = req.params.id;

    const {title, description} = req.body;

    let currentBlogToUpdate;

    try {
        currentBlogToUpdate = await Blog.findByIdAndUpdate(id, {title, description});
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: 'Something went wrong! Please try again'});
    }

    if(!currentBlogToUpdate) {
        return res.status(500).json({message: 'Unable to update'});
    }

    return res.status(200).json({ currentBlogToUpdate });
};

module.exports = { fetchListOfBlog, addNewBlog, deleteABlog, updateABlog };