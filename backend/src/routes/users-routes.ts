import express from 'express';
import { getAllUsers, createUser, deleteUser, getUserById, loginUser } from '../controllers/users-controllers';
import { validateCreateUser } from '../middlewares/validations';

export const userRoutes = express.Router();

userRoutes.get('/', getAllUsers);

userRoutes.get('/:userId', getUserById);

userRoutes.post('/signup', validateCreateUser,createUser);

userRoutes.post('/login',loginUser);

userRoutes.delete('/:userId', deleteUser)
