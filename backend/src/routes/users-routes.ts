import express from 'express';
import { getUserById } from '../controllers/users-controllers';

export const userRoutes = express.Router()

userRoutes.get('/:userId', getUserById);

