import { Router } from "express";
import { loginUser, registerUser } from "../controllers/usersController.js";
const router = Router();


/***********************Register a user***************************/
router.post('/register', registerUser)
/***********************Login user***************************/
router.post('/login', loginUser)

export {router as usersRoutes}