import { Request, Response, NextFunction } from 'express';
import { HttpError } from '../models/http-error';
import { User } from '../types/types';

let DUMMY_USERS: User[] = [
	{
		id: 'u1',
        name: 'Peter',
		email: 'test@test.com',
		bio: 'This is a test bio',
		profilePicture: 'an image',
		birthDate: '03/03/1990',
	},
	{
		id: 'u2',
        name: 'Steve',
		email: 'test2@test.com',
		bio: 'This is another test bio',
		profilePicture: 'another image',
		birthDate: '03/04/1990',
	},
	{
		id: 'u3',
        name: 'Jenny',
		email: 'test3@test.com',
		bio: 'This is the third test bio',
		profilePicture: 'third image',
		birthDate: '03/05/1990',
	},
];

export const getUserById = (req: Request, res: Response, next: NextFunction) => {
	const userId = req.params.userId;

	const user = DUMMY_USERS.find((user) => {
		return user.id === userId;
	});

	if (!user) {
		return next(new HttpError('No user found for provided id', 404));
	}

	res.json({ user });
};

export const createUser = (req: Request, res: Response, next: NextFunction) => {
    const { name, birthDate, email } = req.body;

    const createdUser: User = {
        id: crypto.randomUUID(),
        name,
        birthDate,
        email,
        bio: '',
        profilePicture: 'test'
    }

    DUMMY_USERS.push(createdUser);

	res.status(201).json(`User ${name} created!`);
}