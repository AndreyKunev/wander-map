import express from 'express';
import { getAllUsers, createUser, deleteUser, getUserById, loginUser } from '../controllers/users-controllers';

export const userRoutes = express.Router();

userRoutes.get('/', getAllUsers);

userRoutes.get('/:userId', getUserById);

userRoutes.post('/signup', createUser);

userRoutes.post('/login', loginUser);

userRoutes.delete('/:userId', deleteUser)
