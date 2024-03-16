import { Router } from "express";

import { addPost, getPosts,getUserPosts, deletePost, updatePost } from "../controllers/postsController.js";
import auth from "../middlewares/auth.js";
const router = Router();

/* Get all posts */
router.get('/', getPosts);
/* Get User all posts */
router.get('/user',auth,getUserPosts);
/* Add a new post */
router.post('/',auth, addPost);

/* Delete a new post */
router.delete('/:id',auth,deletePost);

/* Update a post */
router.put('/:id',auth,updatePost)
export {router as postsRoutes}