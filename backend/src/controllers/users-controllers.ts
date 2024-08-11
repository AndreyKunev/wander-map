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
		password: 'test',
	},
	{
		id: 'u2',
		name: 'Steve',
		email: 'test2@test.com',
		bio: 'This is another test bio',
		profilePicture: 'another image',
		birthDate: '03/04/1990',
		password: 'test',
	},
	{
		id: 'u3',
		name: 'Jenny',
		email: 'test3@test.com',
		bio: 'This is the third test bio',
		profilePicture: 'third image',
		birthDate: '03/05/1990',
		password: 'test',
	},
];

export const getAllUsers = (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	res.json({ users: DUMMY_USERS });
};

export const getUserById = (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const userId = req.params.userId;

	const user = DUMMY_USERS.find((user) => {
		return user.id === userId;
	});

	if (!user) {
		return next(new HttpError('No user found for provided id', 404));
	}

	res.json({ user });
};

export const loginUser = (req: Request, res: Response, next: NextFunction) => {
	const { email, password } = req.body;

	const targetUser = DUMMY_USERS.find(user => user.email === email)

	if (!targetUser || targetUser.password !== password) {
		throw new HttpError('Could not identify user - wrong credentials!', 401)
	}

	res.json({message: 'Login successful.'})
};

export const createUser = (req: Request, res: Response, next: NextFunction) => {
	const { name, birthDate, email, password } = req.body;

	const hasUser = DUMMY_USERS.find((user) => user.email === email);

	if (hasUser) {
		throw new HttpError('User with this email already exists!', 422);
	}

	const createdUser: User = {
		id: crypto.randomUUID(),
		name,
		birthDate,
		password,
		email,
		bio: '',
		profilePicture: 'test',
	};

	DUMMY_USERS.push(createdUser);

	res.status(201).json({
		message: `User ${name} created!`,
		user: createdUser,
	});
};

export const deleteUser = (req: Request, res: Response, next: NextFunction) => {
	const userId = req.params.userId;

	const targetIndex = DUMMY_USERS.findIndex((user) => user.id === userId);

	if (targetIndex === -1) {
		return next(new HttpError('No user found for provided id.', 404));
	}

	DUMMY_USERS = DUMMY_USERS.filter((user) => user.id !== userId);

	res.status(200).json({ message: 'User deleted' });
};
