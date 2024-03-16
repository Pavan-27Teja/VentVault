import mongoose from "mongoose";
import Post from "../models/PostModel.js";
import User from "../models/userModel.js";



/***********************Get all Posts***************************/

const getPosts =async (req,res)=>{
    try{
        const posts = await Post.find().sort({createdAt:"desc"});
        res.status(200).json({posts})
    }catch(error){
        res.status(500).json({error: error.message })
    }
}

/***********************Get User Posts***************************/
const getUserPosts =async (req,res)=>{
    const user = await User.findById(req.user._id)
    try{
        const userPosts = await Post.find({user:user._id}).sort({createdAt:"desc"});;
        res.status(200).json({userPosts,email: user.email})
    }catch(error){
        res.status(500).json({error: error.message })
    }
}
/***********************Create a New Post***************************/

const addPost = async (req,res)=>{
    const { title,body} = req.body;
    if(!title || !body){
        return res.status(400).json({error:"All fields are to be filled"})
    }
    // Grab the authenticated user from request body
    const user = await User.findById(req.user._id)
    try{
        const post = await Post.create({user:user._id,title,body});
        res.status(200).json({success: "Post Created." , post})
    } catch(error){
        res.status(500).json({error: error.message })
    }
    
    
}

/***********************Delete a  Post***************************/


const deletePost = async (req,res)=>{
    if(!mongoose.Types.ObjectId.isValid(req.params.id)){
        return res.status(400).json({error:"Incorrect ID"});
    }
    const post = await Post.findById(req.params.id)
    if(!post){
        return res.status(400).json({error:"Did not find the post"});
    }
    // Check the user if he is the creator of post
    const user = await User.findById(req.user._id)
    if(!post.user.equals(user._id)){
        return res.status(401).json({error:"Not authorized to delete the post"})
    }
    try{
        await post.deleteOne()
        res.status(200).json({success: "Post Deleted"})
    }catch(error){
        res.status(500).json({error: error.message })
    }
}


/***********************Update a  Post***************************/


const updatePost = async (req,res)=>{
    // Grab the data from client request 
    const {title,body} = req.body;
    if(!title||!body){
        return res.status(400).json({error:"All fields are required"})
    }

    if(!mongoose.Types.ObjectId.isValid(req.params.id)){
        return res.status(400).json({error:"Post not found"});
    }
    const post = await Post.findById(req.params.id);
    if(!post){
        return res.status(400).json({error:"Post not found"});
    }
    const user = await User.findById(req.user._id)
    if(!post.user.equals(user._id)){
       return res.status(401).json({error:"Not authorized to delete the post"})
    }
    try{
        await post.updateOne({title,body})
        res.status(200).json({success:"The post is successfully updated"})
    }catch(error){
        res.status(500).json({error:error.message})
    }
};
export {addPost,getPosts, getUserPosts, deletePost,updatePost}